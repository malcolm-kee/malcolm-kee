import cx from 'classnames';
import React from 'react';
import './main-content.scss';

export const MainContent = ({
  as: Component = 'main',
  className,
  ...props
}) => <Component className={cx('main-content', className)} {...props} />;
