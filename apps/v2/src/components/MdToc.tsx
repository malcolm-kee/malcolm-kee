import { Disclosure } from '@headlessui/react';
import type { MarkdownHeading } from 'astro';
import { clsx } from 'clsx';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import { CloseIcon } from './icons';

export const MdToc = (props: {
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
      className={clsx('py-3 relative [--collapse-duration:100ms]', props.className)}
    >
      {({ open }) => (
        <>
          <div className="absolute top-0 right-0 scale-y-50 bottom-0 left-0 bg-white rounded-none transition duration-200 delay-[var(--collapse-duration)] ui-open:rounded-xl ui-open:bg-zinc-50 ui-open:delay-0 ui-open:scale-y-100" />
          <div className="relative">
            <div
              id={labelId}
              className="px-6 text-xl transition-transform duration-300 delay-[calc(var(--collapse-duration)+300ms)] ui-open:delay-0"
            >
              Contents
            </div>
            <Disclosure.Button className="group/toggle flex items-center absolute top-0 right-0 bottom-0 left-0 w-full px-4">
              <span
                className={clsx(
                  'transition-all duration-200 text-start flex-1 delay-[var(--collapse-duration)]',
                  'sm:flex-initial sm:ui-open:flex-1 ui-open:duration-500 ui-open:delay-0'
                )}
              >
                <span
                  aria-hidden
                  className={clsx(
                    'block -ml-4 px-3 py-2 sm:pl-2 sm:pr-0 sm:py-0 text-zinc-500 text-xl bg-zinc-50 duration-300 delay-[calc(var(--collapse-duration)+100ms)] rounded-l-md shadow',
                    'ui-open:ml-0 ui-open:text-zinc-900 ui-open:shadow-none',
                    'group-hover/toggle:bg-zinc-100',
                    'ui-open:delay-0 ui-open:group-hover/toggle:bg-zinc-50'
                  )}
                >
                  <span
                    className={clsx(
                      'block text-start origin-left font-light duration-300 delay-[calc(var(--collapse-duration)+100ms)]',
                      'sm:scale-[0.8] sm:ui-open:scale-100 ui-open:font-normal ui-open:delay-0'
                    )}
                  >
                    Contents
                  </span>
                </span>
              </span>
              <span
                className={clsx(
                  'block pr-2 py-3 sm:py-1 bg-zinc-50 shadow rounded-r-md duration-300 ui-open:shadow-none',
                  '-mr-4 ui-open:mr-0 sm:mr-0 [clip-path:inset(-3px_-3px_-3px_0)]',
                  'group-hover/toggle:bg-zinc-100 ui-open:group-hover/toggle:bg-zinc-50',
                  'delay-[var(--collapse-duration)] ui-open:delay-0'
                )}
              >
                <CloseIcon
                  aria-hidden
                  className={clsx(
                    'w-5 h-5 stroke-zinc-500 transition delay-[var(--collapse-duration)]',
                    '-rotate-[135deg] scale-[0.6]',
                    'ui-open:rotate-0 ui-open:scale-100 ui-open:duration-500 ui-open:delay-0'
                  )}
                />
              </span>
            </Disclosure.Button>
          </div>
          <AnimateHeight
            height={open ? 'auto' : 0}
            duration={open ? 300 : 150}
            easing={open ? 'ease' : 'cubic-bezier(0.33, 1, 0.68, 1)'}
            className="relative"
          >
            <Disclosure.Panel static>
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
            </Disclosure.Panel>
          </AnimateHeight>
        </>
      )}
    </Disclosure>
  );
};
