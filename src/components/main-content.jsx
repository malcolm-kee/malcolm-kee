import cx from 'classnames';
import * as React from 'react';

export const MainContent = ({
  as: Component = 'main',
  className,
  ...props
}) => (
  <Component
    className={cx('container mx-auto lg:pt-24', className)}
    {...props}
  />
);
