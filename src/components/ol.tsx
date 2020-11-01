import cx from 'classnames';
import * as React from 'react';
import styles from './ol.module.css';

type OlProps = React.DetailedHTMLProps<
  React.OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>;

export const Ol: React.FC<OlProps> = ({ className, ...props }) => (
  <ol className={cx(styles.ol, className)} {...props} />
);
