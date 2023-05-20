import { clsx } from 'clsx';
import * as React from 'react';

export const variantStyles = {
  primary:
    'bg-primary-600 font-semibold text-white border-transparent hover:bg-primary-700/90 disabled:bg-[#6cbeb8]',
  secondary:
    'bg-white font-medium text-primary-800 border-transparent hover:bg-zinc-50/90 active:bg-zinc-50 active:text-primary-900 disabled:bg-white disabled:text-[#83aeac]',
};

export const raisedStyles = {
  primary:
    'border-b-primary-900 border-l-primary-900/20 border-r-primary-900/10 active:border-transparent',
  secondary: 'border-b-zinc-300 active:border-transparent',
};

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
  flat?: boolean;
  href?: string;
  download?: boolean;
}

export function Button({
  variant = 'primary',
  disabled,
  flat = disabled,
  href,
  download,
  ...props
}: ButtonProps) {
  const className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none border',
    variantStyles[variant],
    'data-[success]:bg-emerald-600 data-[success]:text-zinc-100 data-[success]:hover:bg-emerald-500 data-[success]:active:bg-emerald-600',
    !disabled && !flat && 'active:translate-y-px',
    !flat && ['shadow active:shadow-none', raisedStyles[variant]],
    props.className
  );

  if (href) {
    return (
      <a href={href} className={className} download={download} aria-label={props['aria-label']}>
        {props.children}
      </a>
    );
  }

  return <button type="button" {...props} disabled={disabled} className={className} />;
}
