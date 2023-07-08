import * as React from 'react';
import { clsx } from 'clsx';

export default function Aside(props: {
  children: React.ReactNode;
  heading?: string;
  className?: string;
  static?: boolean;
}) {
  return (
    <div data-component="aside" className={props.className}>
      <div className="relative">
        <aside
          className={clsx(
            'bg-sky-50 shadow max-w-2xl mx-auto p-6',
            !props.static &&
              '2xl:absolute 2xl:left-full 2xl:w-80 2xl:bottom-0 2xl:translate-y-1/2 2xl:bg-transparent 2xl:shadow-none'
          )}
        >
          <div className="relative">
            {props.heading && (
              <p
                className={clsx(
                  'text-sky-900 mt-0',
                  props.static ? 'text-xl' : 'text-xl 2xl:text-base'
                )}
              >
                {props.heading}
              </p>
            )}
            <div className="prose prose-sm">{props.children}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
