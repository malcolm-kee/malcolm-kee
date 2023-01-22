import * as React from 'react';

export interface ExerciseProps {
  title: string;
  children: React.ReactNode;
}

export default function Exercise({ title, children }: ExerciseProps) {
  return (
    <section className="my-3">
      {title && (
        <div className="inline-flex relative not-prose px-7">
          <div className="absolute left-0 w-7 inset-y-0">
            <div className="absolute left-0 bottom-0 w-square-diagonal aspect-square bg-gray-100 rotate-45 origin-bottom-left" />
          </div>
          <div className="absolute right-0 w-7 inset-y-0">
            <div className="absolute right-0 bottom-0 w-square-diagonal aspect-square bg-gray-100 -rotate-45 origin-bottom-right" />
          </div>
          <h3 className="px-1 font-medium tracking-wide bg-gray-100 relative uppercase">
            {title}
          </h3>
        </div>
      )}
      <div className="bg-gray-100 py-1 rounded-b-lg rounded-tr-lg px-1">
        {children}
      </div>
    </section>
  );
}
