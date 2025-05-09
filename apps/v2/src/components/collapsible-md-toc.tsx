import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import type { MarkdownHeading } from 'astro';
import { clsx } from 'clsx';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import { CloseIcon, ListIcon } from './icons';

export const CollapsibleMdToc = (props: {
  headings: Array<MarkdownHeading>;
  id?: string;
  className?: string;
}) => {
  const defaultId = React.useId();

  const id = props.id || defaultId;

  const labelId = `${id}-label`;

  return (
    <Disclosure
      as="nav"
      aria-labelledby={labelId}
      className={clsx('pb-3 relative [--collapse-duration:100ms]', props.className)}
    >
      {({ open }) => (
        <>
          <div
            className={clsx(
              'absolute top-0 right-0 scale-y-50 bottom-0 left-0',
              'transition-all duration-200 delay-[var(--collapse-duration)] ui-open:delay-0 ',
              'bg-white rounded-none ui-open:rounded-xl ui-open:scale-y-100 ui-open:outline ui-open:outline-zinc-100'
            )}
          />
          <div className="relative">
            <DisclosureButton
              className={clsx(
                'group/toggle w-full hover:bg-zinc-50 outline outline-1 outline-zinc-100 rounded ui-open:rounded-t-xl ui-open:rounded-b-none',
                'cursor-s-resize ui-open:cursor-n-resize'
              )}
            >
              <span
                className={clsx(
                  'block',
                  'duration-200 delay-[var(--collapse-duration)]',
                  'ui-open:duration-500 ui-open:delay-0 ui-open:border-b-2 ui-open:border-zinc-100 ui-open:pb-2 ui-open:pt-3',
                  'ui-open:bg-zinc-50'
                )}
              >
                <span
                  className={clsx(
                    'flex justify-between items-center gap-1',
                    'text-start px-2',
                    'transition-all duration-200 delay-[var(--collapse-duration)]',
                    'ui-open:duration-0 ui-open:delay-0',
                    'text-zinc-500 ui-open:text-zinc-900 group-hover/toggle:text-zinc-900',
                    'rounded-md'
                  )}
                >
                  <span
                    className={clsx(
                      'flex items-center gap-1',
                      'px-1 py-2 sm:py-0 text-xl transition duration-300 delay-[calc(var(--collapse-duration)+100ms)]',
                      'translate-x-0 ui-open:translate-x-4',
                      'ui-open:delay-0'
                    )}
                  >
                    <ListIcon className="w-4 h-4 text-zinc-500 ui-open:opacity-0 ui-open:translate-y-full duration-300" />
                    <span
                      className={clsx(
                        'block text-start origin-left font-light duration-300 delay-[calc(var(--collapse-duration)+100ms)]',
                        'sm:text-sm sm:leading-7 sm:ui-open:text-xl ui-open:font-normal ui-open:delay-0'
                      )}
                      id={labelId}
                    >
                      <span className="block ui-open:-translate-x-5 transition duration-300">
                        Contents
                      </span>
                    </span>
                  </span>
                  <span
                    className={clsx(
                      'block p-3 sm:p-1 rounded-full',
                      'translate-x-0 ui-open:-translate-x-2',
                      'duration-300 delay-[var(--collapse-duration)] ui-open:delay-0'
                    )}
                    aria-hidden
                  >
                    <CloseIcon
                      className={clsx(
                        'w-5 h-5 stroke-zinc-500 transition delay-[var(--collapse-duration)]',
                        '-rotate-[135deg] scale-75 sm:scale-[0.6]',
                        'ui-open:rotate-0 ui-open:scale-100 sm:ui-open:scale-100 ui-open:duration-500 ui-open:delay-0',
                        'opacity-0 ui-open:opacity-100'
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
              <ol className="flex flex-col gap-4 py-3 px-7">
                {props.headings.map((h, index) => {
                  const indent = Math.max(0, h.depth - 2);

                  return (
                    <li
                      className={
                        {
                          '1': 'pl-4 md:pl-8',
                          '2': 'pl-8 md:pl-16',
                          '3': 'pl-12 md:pl-24',
                          '4': 'pl-16 md:pl-32',
                        }[indent]
                      }
                      style={{ '--index': `${index}` } as React.CSSProperties}
                      key={h.slug}
                    >
                      <a
                        href={`#${h.slug}`}
                        className={clsx(
                          'text-zinc-500 underline md:no-underline transition hover:text-primary-600',
                          indent > 0 && 'text-sm'
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
