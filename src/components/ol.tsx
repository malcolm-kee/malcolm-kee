import cx from 'classnames';
import React from 'react';
import styles from './ol.module.scss';

type OlProps = React.DetailedHTMLProps<
  React.OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>;

export const Ol: React.FC<OlProps> = ({ className, ...props }) => (
  <ol className={cx(styles.ol, className)} {...props} />
);
