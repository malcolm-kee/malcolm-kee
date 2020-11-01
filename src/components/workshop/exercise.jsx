import * as React from 'react';
import styles from './exercise.module.css';

export const Exercise = ({ title, children }) => {
  return (
    <section className={styles.root}>
      {title && <h3 className="text-lg mb-2">{title}</h3>}
      {children}
    </section>
  );
};
