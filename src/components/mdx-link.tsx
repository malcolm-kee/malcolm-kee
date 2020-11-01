import cx from 'classnames';
import { Link } from 'gatsby';
import * as React from 'react';
import styles from './mdx-link.module.scss';
import { OutLink } from './OutLink';

type MdxLinkProps = Omit<JSX.IntrinsicElements['a'], 'ref'>;

export const MdxLink = ({
  href,
  children,
  className,
  ...props
}: MdxLinkProps) => {
  if (!href) {
    return null;
  }
  if (href[0] === '/') {
    return (
      <Link to={href} className={cx(styles.link, className)} {...props}>
        {children}
      </Link>
    );
  }
  if (href[0] === '#') {
    return (
      <a href={href} className={cx(styles.link, className)} {...props}>
        {children}
      </a>
    );
  }
  return (
    <OutLink href={href} className={cx(styles.link, className)} {...props}>
      {children}
    </OutLink>
  );
};
