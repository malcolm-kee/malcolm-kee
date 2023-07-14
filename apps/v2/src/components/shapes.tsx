import { clsx } from 'clsx';
import * as React from 'react';
import styles from './shapes.module.scss';

export const Box = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
  <div className={clsx(styles.box, className)} {...props} />
);

export const Circle = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
  <div className={clsx(styles.circle, className)} {...props} />
);
