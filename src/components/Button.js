import React from 'react';
import { joinClassName } from 'join-string';
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
    className={joinClassName('btn', color, raised && 'raised', className)}
    {...restProps}
  >
    {children}
  </Component>
);
