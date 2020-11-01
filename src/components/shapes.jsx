import cx from 'classnames';
import * as React from 'react';
import { box, circle } from './shapes.module.css';

export const Box = ({ className, ...props }) => (
  <div className={cx(box, className)} {...props} />
);

export const Circle = ({ className, ...props }) => (
  <div className={cx(circle, className)} {...props} />
);
