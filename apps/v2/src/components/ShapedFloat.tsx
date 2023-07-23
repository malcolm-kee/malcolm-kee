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
}: ShapedFloatProps) => {
  return (
    <div
      {...props}
      className={clsx(
        {
          left: styles.left,
          right: styles.right,
        }[float],
        styles.shaped,
        className
      )}
      style={
        {
          '--shape-outside': `url("${shapeSrc}")`,
          '--shape-image-threshold': shapeThreshold,
          '--shape-margin': shapeMargin,
        } as React.CSSProperties
      }
    />
  );
};
