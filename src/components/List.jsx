import cx from 'classnames';
import { Link } from 'gatsby';
import * as React from 'react';
import { getLinkTarget } from '../lib/util';
import styles from './List.module.css';
import './List.css';
import { OutLink } from './OutLink';

export const List = ({
  children,
  className,
  component: Component = 'div',
  ...restProps
}) => (
  <Component className={cx('List', className)} role="list" {...restProps}>
    {children}
  </Component>
);

export const ListItem = ({
  children,
  className,
  component: Component = 'div',
  link,
  button = link ? true : false,
  ...restProps
}) => {
  const linkTarget = link && getLinkTarget(link);

  return (
    <Component
      className={cx(
        'List--ListItem',
        button && 'button animated',
        link && styles.withLink,
        className
      )}
      role="listitem"
      {...restProps}
    >
      {link ? (
        linkTarget === 'inner' ? (
          <Link to={link} className={styles.link}>
            {children}
          </Link>
        ) : linkTarget === 'outer' ? (
          <OutLink to={link} className={styles.link}>
            {children}
          </OutLink>
        ) : (
          <a href={link} className={styles.link}>
            {children}
          </a>
        )
      ) : (
        children
      )}
    </Component>
  );
};

export const ListItemText = ({
  primaryText = '',
  boldPrimary = false,
  secondaryText,
  tertiaryText,
  hideOverflow = false,
  className,
}) => (
  <div
    className={cx(
      'List--ListItemText',
      hideOverflow && 'hide-overflow',
      className
    )}
  >
    <p className={cx('primary animated', boldPrimary && 'font-bold')}>
      {primaryText}
    </p>
    {secondaryText && <p className="secondary">{secondaryText}</p>}
    {tertiaryText && <p className="tertiary">{tertiaryText}</p>}
  </div>
);

export const ListItemLabel = ({ className, ...restProps }) => (
  <div className={cx('List--ListItemLabel', className)} {...restProps} />
);
