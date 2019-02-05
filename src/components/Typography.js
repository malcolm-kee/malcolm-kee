import React from 'react';
import { joinClassName } from 'join-string';
import './Typography.scss';

export const Typography = ({
  children,
  className = '',
  variant = 'body',
  component: Component = 'p',
  ...restProps
}) => (
  <Component
    className={joinClassName(`Typography--${variant}`, className)}
    {...restProps}
  >
    {children}
  </Component>
);
