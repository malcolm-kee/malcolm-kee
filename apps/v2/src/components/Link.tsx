import { clsx } from 'clsx';
import * as React from 'react';

export const Link = (props: React.ComponentPropsWithoutRef<'a'>) => {
  return (
    <a
      {...props}
      className={clsx(
        'no-underline border-b border-dashed border-zinc-600/50',
        'hover:border-solid hover:border-primary-300 hover:text-primary-600',
        props.className
      )}
    />
  );
};
