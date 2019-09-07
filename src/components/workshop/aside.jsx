import React from 'react';
import styles from './aside.module.scss';

export const Aside = ({ children }) => (
  <aside className={styles.root}>{children}</aside>
);
