import { clsx } from 'clsx';
import * as React from 'react';
import type { WorkshopTocItem } from '~/data/workshop-helpers';

export const WorkshopNavigation = (props: {
  items: Array<WorkshopTocItem>;
  className?: string;
  currentPath: string;
}) => {
  return (
    <nav className={clsx('text-base lg:text-sm', props.className)}>
      <ul className="space-y-9">
        {props.items.map((section, index) => (
          <li key={index}>
            {section.label ? (
              <h2 className="font-display font-medium text-slate-900 dark:text-white uppercase">
                {section.label}
              </h2>
            ) : null}
            <ul className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800 dark:lg:border-slate-800">
              {section.items.map((item) => (
                <li key={item.url} className="relative">
                  <a
                    href={item.url}
                    className={clsx(
                      'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                      item.url === props.currentPath
                        ? 'font-semibold text-sky-500 before:bg-sky-500'
                        : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
