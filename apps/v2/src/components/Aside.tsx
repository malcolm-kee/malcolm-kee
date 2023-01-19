/* jsxImportSource: react */
import * as React from 'react';

export default function Aside(props: {
  children: React.ReactNode;
  heading?: string;
}) {
  return (
    <aside className="p-6 bg-sky-50">
      {props.heading && (
        <p className="text-xl text-sky-900 mt-0">{props.heading}</p>
      )}
      <div className="prose">{props.children}</div>
    </aside>
  );
}
