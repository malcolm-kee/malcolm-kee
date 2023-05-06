import * as React from 'react';
import { clsx } from 'clsx';
import styles from './ShapedFloat.module.css';

export interface ShapedFloatProps extends React.ComponentPropsWithoutRef<'div'> {
  float: 'left' | 'right';
  shapeSrc: string;
  shapeThreshold?: string;
  shapeMargin?: string;
}

export const ShapedFloat = ({
  float,
  shapeSrc,
  shapeThreshold = '0.01',
  shapeMargin = '6px',
  className,
  ...props
}: ShapedFloatProps) => (
  <div
    {...props}
    className={clsx(
      {
        left: 'float-left pr-2',
        right: 'float-right pl-2',
      }[float],
      styles.shaped,
      className
    )}
    style={{
      shapeOutside: `url("${shapeSrc}")`,
      shapeImageThreshold: shapeThreshold,
      shapeMargin,
    }}
  />
);
