import { clsx } from 'clsx';
import * as React from 'react';
import type { WorkshopTocItem } from '~/data/workshop-helpers';
import styles from './workshop-styles.module.css';

export interface WorkshopNavigationProps {
  items: Array<WorkshopTocItem>;
  currentPath: string;
  headingClass: string;
  className?: string;
}

export const WorkshopNavigation = React.forwardRef<
  HTMLElement,
  WorkshopNavigationProps
>(function WorkshopNavigation(props, forwardedRef) {
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (listRef.current) {
      const activeLink = listRef.current.querySelector(
        'a[aria-current="page"]'
      );
      if (activeLink) {
        import('scroll-into-view-if-needed').then((m) =>
          m.default(activeLink, {
            scrollMode: 'if-needed',
          })
        );
      }
    }
  }, []);

  return (
    <nav
      className={clsx('text-base lg:text-sm', props.className)}
      ref={forwardedRef}
    >
      <ul className="space-y-9" ref={listRef}>
        {props.items.map((section, index) => (
          <li key={index}>
            {section.label ? (
              <h2
                className={clsx(
                  'sticky z-10 px-0.5 bg-slate-50 dark:bg-slate-900',
                  'font-display font-medium text-slate-900 dark:text-white uppercase',
                  props.headingClass
                )}
              >
                {section.label}
              </h2>
            ) : null}
            <div className="px-0.5">
              <ul className="mt-2 space-y-4 border-l-2 border-slate-100 lg:mt-4 lg:border-slate-200 dark:border-slate-800 dark:lg:border-slate-800">
                {section.items.map((item) => {
                  const isActive = item.url === props.currentPath;

                  return (
                    <li key={item.url} className="relative">
                      <a
                        href={item.url}
                        className={clsx(
                          'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                          isActive
                            ? [
                                'font-semibold text-sky-500 before:bg-sky-500',
                                styles.sidebarHighlighted,
                              ]
                            : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
});
