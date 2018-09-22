import React from 'react';
import { getClassName } from '../helper';
import './Button.scss';

export const Button = ({
  component: Component = 'button',
  color = '',
  raised = false,
  className,
  children,
  ...restProps
}) => (
  <Component
    className={getClassName('btn', color, raised && 'raised', className)}
    {...restProps}
  >
    {children}
  </Component>
);
