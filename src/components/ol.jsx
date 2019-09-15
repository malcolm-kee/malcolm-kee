import cx from 'classnames';
import React from 'react';
import styles from './ol.module.scss';

export const Ol = ({ className, ...props }) => (
  <ol className={cx(styles.ol, className)} {...props} />
);
