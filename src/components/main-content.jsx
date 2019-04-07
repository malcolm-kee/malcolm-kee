import { joinClassName } from 'join-string';
import React from 'react';
import './main-content.scss';

export const MainContent = ({
  as: Component = 'main',
  className,
  children
}) => (
  <Component className={joinClassName('main-content', className)}>
    {children}
  </Component>
);
