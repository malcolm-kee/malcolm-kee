import * as React from 'react';
import styles from './aside.module.css';

export const Aside = ({ children }) => (
  <aside className={styles.root}>{children}</aside>
);
