import React from 'react';
import { root, head } from './exercise.module.scss';

export const Exercise = ({ title, children }) => {
  return (
    <section className={root}>
      {title && <h3 className={head}>{title}</h3>}
      {children}
    </section>
  );
};
