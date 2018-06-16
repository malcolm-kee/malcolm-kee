import React from 'react';
import './Typography.scss';

export const Typography = ({
  children,
  className = '',
  variant = 'body',
  component: Component = 'p',
  ...restProps
}) => (
  <Component className={`Typography--${variant} ${className}`} {...restProps}>
    {children}
  </Component>
);
