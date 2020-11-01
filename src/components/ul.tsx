import cx from 'classnames';
import * as React from 'react';
import styles from './ul.module.scss';

type UlProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

export const Ul: React.FC<UlProps> = ({ className, ...props }) => (
  <ul className={cx(styles.ul, 'block pl-6', className)} {...props} />
);
