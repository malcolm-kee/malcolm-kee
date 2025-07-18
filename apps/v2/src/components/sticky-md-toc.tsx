import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import type { MarkdownHeading } from 'astro';
import { clsx } from 'clsx';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import { listen } from '~/lib/event-helper';
import { ChevronDownIcon, ListIcon } from './icons';

export const StickyMdToc = (props: {
  headings: Array<MarkdownHeading>;
  labelId: string;
  className?: string;
}) => {
  const tocRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (tocRef.current) {
      return setupAutoHighlightActiveHeading(tocRef.current);
    }
  }, []);

  return (
    <Disclosure
      as="div"
      className={clsx('relative w-full [--collapse-duration:100ms]', props.className)}
      ref={tocRef}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <DisclosureButton className={clsx('group/toggle w-full hover:bg-zinc-200')}>
              <span
                className={clsx(
                  'block',
                  'duration-200 [transition-delay:var(--collapse-duration)]',
                  'ui-open:duration-500 ui-open:delay-0 ui-open:bg-zinc-50'
                )}
              >
                <span
                  className={clsx(
                    'flex justify-between items-center gap-1',
                    'text-start px-2',
                    'transition-all duration-200 [transition-delay:var(--collapse-duration)]',
                    'ui-open:duration-0 ui-open:delay-0',
                    'text-zinc-500'
                  )}
                >
                  <span
                    className={clsx(
                      'flex items-center gap-1',
                      'px-1 py-2 sm:py-0 text-xl transition duration-300',
                      'translate-x-0 ui-open:translate-x-4',
                      'ui-open:delay-0',
                      '[transition-delay:calc(var(--collapse-duration)+100ms)]'
                    )}
                  >
                    <ListIcon className="w-4 h-4 text-zinc-400 ui-open:opacity-0 ui-open:translate-y-full duration-300" />
                    <span
                      className={clsx(
                        'block text-start origin-left font-light duration-300',
                        'sm:text-sm sm:leading-7 ui-open:delay-0',
                        '[transition-delay:calc(var(--collapse-duration)+100ms)]'
                      )}
                      id={props.labelId}
                    >
                      <span className="block ui-open:-translate-x-5 transition duration-300">
                        Contents
                      </span>
                    </span>
                  </span>
                  <span
                    className={clsx(
                      'block p-3 sm:p-1 rounded-full',
                      'duration-300 [transition-delay:var(--collapse-duration)] ui-open:delay-0'
                    )}
                    aria-hidden
                  >
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={clsx(
                        'w-4 h-4 stroke-zinc-500 transition [transition-delay:var(--collapse-duration)]',
                        'rotate-0 ui-open:-rotate-180',
                        'ui-open:duration-500 ui-open:delay-0'
                      )}
                    />
                  </span>
                </span>
              </span>
            </DisclosureButton>
          </div>
          <AnimateHeight
            height={open ? 'auto' : 0}
            duration={open ? 300 : 150}
            easing={open ? 'ease' : 'cubic-bezier(0.33, 1, 0.68, 1)'}
            className="relative"
          >
            <DisclosurePanel static>
              <ol className="flex flex-col gap-4 py-3 px-7" inert={!open}>
                {props.headings.map((h) => {
                  const indent = Math.max(0, h.depth - 2);

                  return (
                    <li key={h.slug}>
                      <a
                        href={`#${h.slug}`}
                        className={clsx(
                          'block text-sm text-zinc-500 underline md:no-underline transition hover:text-primary-600',
                          {
                            '1': 'pl-4',
                            '2': 'pl-8',
                            '3': 'pl-12',
                            '4': 'pl-16',
                          }[indent],
                          indent > 0 && 'border-l border-l-zinc-100'
                        )}
                        data-target={h.slug}
                      >
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </DisclosurePanel>
          </AnimateHeight>
        </>
      )}
    </Disclosure>
  );
};

function setupAutoHighlightActiveHeading(tocSection: Element) {
  const links = tocSection.querySelectorAll<HTMLElement>('li > a');

  const headings: Array<{
    element: HTMLElement;
    top: number;
  }> = [];

  links.forEach((element) => {
    const target = element.dataset.target;

    const targetElement = target && document.getElementById(target);

    if (targetElement) {
      const scrollMt = parseFloat(window.getComputedStyle(targetElement).scrollMarginTop);

      const top =
        window.scrollY +
        targetElement.getBoundingClientRect().top -
        scrollMt -
        window.innerHeight / 2;

      headings.push({
        top,
        element,
      });
    }
  });

  if (headings.length === 0) {
    return;
  }

  const mediaQuery = window.matchMedia('(min-width: 1280px)');

  let cleanup: () => void | undefined;

  function syncLinks() {
    let top = window.scrollY;
    let current = headings[0];

    for (let heading of headings) {
      if (top >= heading.top) {
        current = heading;
      } else {
        break;
      }
    }
    if (current) {
      links.forEach((link) => {
        if (link === current.element) {
          link.classList.add('text-primary-600');
          link.classList.add('border-l-primary-500');
          link.classList.remove('text-zinc-500');
          link.classList.remove('border-l-zinc-100');
        } else {
          link.classList.add('text-zinc-500');
          link.classList.add('border-l-zinc-100');
          link.classList.remove('text-primary-600');
          link.classList.remove('border-l-primary-500');
        }
      });
    }
  }

  function setupScrollListener() {
    if (mediaQuery.matches) {
      if (cleanup) cleanup();

      syncLinks();

      if ('onscrollend' in window) {
        cleanup = listen(window, 'scrollend', syncLinks);
      } else {
        cleanup = listen(window, 'scroll', syncLinks, { passive: true });
      }
    } else {
      if (cleanup) cleanup();
      links.forEach((link) => {
        link.classList.add('text-zinc-500');
        link.classList.remove('text-primary-600');
      });
    }
  }

  setupScrollListener();

  const cleanupMediaQuery = listen(mediaQuery, 'change', setupScrollListener);

  return function cleanupAll() {
    if (typeof cleanup === 'function') {
      cleanup();
    }

    cleanupMediaQuery();
  };
}
