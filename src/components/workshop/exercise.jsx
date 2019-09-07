import React from 'react';
import styles from './exercise.module.scss';

export const Exercise = ({ title, children }) => {
  return (
    <section className={styles.root}>
      {title && <h3 className={styles.head}>{title}</h3>}
      {children}
    </section>
  );
};
