import * as React from 'react';
import { clsx } from 'clsx';
import type { CollectionEntry } from 'astro:content';

const TodayILearntImpl = function TodayILearnt(props: React.ComponentPropsWithoutRef<'ul'>) {
  return <ul {...props} className={clsx('flex flex-col gap-6', props.className)} />;
};

const TodayILearntItem = ({
  til,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & {
  til: CollectionEntry<'today-i-learnt'>;
}) => (
  <li>
    <a
      {...props}
      href={`/today-i-learnt/${til.slug}`}
      className={clsx(
        'block px-2 border-l-4 border-transparent hover:border-primary-500 transition-colors',
        props.className
      )}
    >
      {til.data.title}
    </a>
  </li>
);

export const TodayILearnt = Object.assign(TodayILearntImpl, {
  Item: TodayILearntItem,
});
