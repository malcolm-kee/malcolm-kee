import { clsx } from 'clsx';
import * as React from 'react';
import styles from './tag.module.css';

export const Tag = (props: React.ComponentPropsWithoutRef<'a'>) => (
  <a
    {...props}
    className={clsx(
      'topic-link block px-3 py-1.5 text-xs font-medium transition-colors uppercase',
      'text-zinc-500 hover:text-primary-500 bg-white border border-dashed border-zinc-300',
      'hover:border-primary-200 hover:border-solid',
      styles.tag,
      props.className
    )}
  />
);
