import React from 'react';
import './Typography.scss';

export const Typography = ({
  children,
  className,
  variant = 'body',
  ...restProps
}) => (
  <p className={`Typography--${variant}`} {...restProps}>
    {children}
  </p>
);
