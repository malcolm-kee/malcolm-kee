import React from 'react';
import { root } from './aside.module.scss';

export const Aside = ({ children }) => (
  <aside className={root}>{children}</aside>
);
