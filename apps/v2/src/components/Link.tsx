import { clsx } from 'clsx';
import * as React from 'react';

export const Link = (props: React.ComponentPropsWithoutRef<'a'>) => {
  return (
    <a
      {...props}
      className={clsx(
        'no-underline',
        'shadow-[inset_0_-2px_0_0_#fff,inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.primary.200))]',
        'hover:[--tw-prose-underline-size:6px]',
        props.className
      )}
    />
  );
};
