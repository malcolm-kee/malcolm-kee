import React from 'react';
import './Button.scss';

export const Button = ({
  component: Component = 'button',
  color = '',
  raised = false,
  children,
  ...restProps
}) => (
  <Component
    className={`btn ${color} ${raised ? 'raised' : ''}`}
    {...restProps}
  >
    {children}
  </Component>
);
