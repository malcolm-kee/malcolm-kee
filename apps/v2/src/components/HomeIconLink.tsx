import * as React from 'react';
import { clsx } from 'clsx';

export const HomeIconLink = () => (
  <a
    href="/"
    className="inline-flex flex-row-reverse items-center gap-3 px-3 rounded group/link"
  >
    <span
      className={clsx(
        'hidden xl:block text-2xl text-teal-700 opacity-0 group-hover/link:opacity-100 group-focus/link:opacity-100 transition',
        '-translate-x-1/2 group-hover/link:translate-x-0 group-focus/link:translate-x-0'
      )}
    >
      Malcolm Kee
    </span>
    <IconContainer className="group-focus-visible/link:bg-transparent group-focus-visible/link:ring-0 group-hover/link:bg-transparent group-hover/link:ring-0">
      <Icon />
    </IconContainer>
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
      isHomePage
        ? 'bg-white/90 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5'
        : 'xl:bg-teal-700/90 xl:shadow-lg xl:ring-1',
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
