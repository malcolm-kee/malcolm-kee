import { clsx } from 'clsx';
import * as React from 'react';

export const HomeIconLink = (props: { iconClass?: string; hideAvatar?: boolean }) => (
  <a
    href="/"
    className={clsx(
      'inline-flex items-center gap-3 -ml-3 group/link',
      props.hideAvatar
        ? 'justify-center w-20 h-20 bg-white/10 rounded-xl'
        : 'rounded px-3 flex-row-reverse'
    )}
  >
    <span
      className={clsx(
        'block text-4xl font-techie font-bold drop-shadow text-zinc-900 hover:text-primary-600 transition',
        !props.hideAvatar && [
          'sr-only',
          'opacity-0 group-hover/link:opacity-100 group-focus/link:opacity-100 transition',
          '-translate-x-1/2 group-hover/link:translate-x-0 group-focus/link:translate-x-0',
        ]
      )}
    >
      MK
    </span>
    {!props.hideAvatar && (
      <IconContainer className="group-focus-visible/link:bg-transparent group-focus-visible/link:ring-0 group-hover/link:bg-transparent group-hover/link:ring-0">
        <Icon className={props.iconClass} />
      </IconContainer>
    )}
  </a>
);

export const IconContainer = ({
  isHomePage,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { isHomePage?: boolean }) => (
  <div
    {...props}
    className={clsx(
      'w-10 h-10 rounded-full p-0.5 backdrop-blur flex-shrink-0',
      isHomePage && 'bg-white/90 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5',
      props.className
    )}
  />
);

export const Icon = ({
  large,
  ...props
}: { large?: boolean } & React.ComponentPropsWithoutRef<'img'>) => (
  <img
    {...props}
    src="/icon.jpg"
    alt=""
    className={clsx(
      'relative block rounded-full',
      large ? 'w-16 h-16' : 'w-9 h-9',
      props.className
    )}
  />
);
