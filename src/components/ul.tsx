import cx from 'classnames';
import React from 'react';
import styles from './ul.module.scss';

type UlProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

export const Ul: React.FC<UlProps> = ({ className, ...props }) => (
  <ul className={cx(styles.ul, className)} {...props} />
);
