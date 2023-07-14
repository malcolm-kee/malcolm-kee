import { clsx } from 'clsx';
import * as React from 'react';
import { ArrowLeftIcon } from './icons';

export interface BackButtonProps extends React.ComponentPropsWithoutRef<'a'> {
  href: string;
}

export const BackButton = React.forwardRef<HTMLAnchorElement, BackButtonProps>(
  function BackButton(props, forwardedRef) {
    return (
      <a
        {...props}
        className={clsx(
          '[view-transition-name:back-button] group flex justify-center items-center h-10 w-10 rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5',
          props.className
        )}
        ref={forwardedRef}
      >
        <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-primary-500" />
      </a>
    );
  }
);
