import * as React from 'react';

export default function Aside(props: {
  children: React.ReactNode;
  heading?: string;
  className?: string;
}) {
  return (
    <div data-component="aside" className={props.className}>
      <aside>
        <div className="relative p-6">
          <div className="absolute inset-0 bg-sky-50 shadow" />
          <div className="relative">
            {props.heading && (
              <p className="text-xl text-sky-900 mt-0">{props.heading}</p>
            )}
            <div className="prose">{props.children}</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
