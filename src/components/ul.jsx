import cx from 'classnames';
import React from 'react';
import styles from './ul.module.scss';

export const Ul = ({ className, ...props }) => (
  <ul className={cx(styles.ul, className)} {...props} />
);
