import React from 'react';
import { ThemeToggle } from './theme-toggle';
import styles from './page-title-container.module.scss';

export const PageTitleContainer = ({ title }) => (
  <div className={styles.root}>
    <h1>{title}</h1>
    <ThemeToggle className={styles.toggle} />
  </div>
);
