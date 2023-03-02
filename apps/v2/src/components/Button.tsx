import { clsx } from 'clsx';
import * as React from 'react';

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60',
};

export function Button({
  variant = 'primary',
  href,
  download,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary';
  href?: string;
  download?: boolean;
}) {
  const className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    props.className
  );

  if (href) {
    return (
      <a
        href={href}
        className={className}
        download={download}
        aria-label={props['aria-label']}
      >
        {props.children}
      </a>
    );
  }

  return <button type="button" {...props} className={className} />;
}
