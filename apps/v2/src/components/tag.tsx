import { clsx } from 'clsx';
import * as React from 'react';

export const Tag = ({ children, className, ...props }: React.ComponentPropsWithoutRef<'a'>) => (
  <a
    {...props}
    className={clsx(
      'group/tag inline-block px-3 py-1.5 text-xs font-medium tracking-wider relative transition-colors uppercase',
      'text-zinc-500 hover:text-primary-500 bg-white border border-dashed border-zinc-300',
      'hover:border-primary-200 hover:border-solid cut-all cut-2',
      className
    )}
  >
    <span className="absolute top-0 left-0 -translate-x-px -translate-y-px block w-2 border-b border-transparent">
      <span className="w-square-diagonal block absolute top-0 right-0 border-b border-dashed border-zinc-300 -rotate-45 origin-top-right group-hover/tag:border-primary-200 group-hover/tag:border-solid" />
    </span>
    <span className="absolute bottom-0 right-0 translate-x-px translate-y-px block w-2 border-b border-transparent">
      <span className="w-square-diagonal block absolute top-0 left-0 border-b border-dashed border-zinc-300 -rotate-45 origin-bottom-left group-hover/tag:border-primary-200 group-hover/tag:border-solid" />
    </span>
    {children}
  </a>
);
