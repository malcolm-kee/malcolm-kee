import cx from 'classnames';
import React from 'react';
import './List.scss';

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
  button,
  noGutter = false,
  ...restProps
}) => (
  <Component
    className={cx(
      'List--ListItem',
      button && 'button animated',
      noGutter && 'no-gutter',
      className
    )}
    role="listitem"
    {...restProps}
  >
    {children}
  </Component>
);

export const ListItemText = ({
  primaryText = '',
  boldPrimary = false,
  secondaryText,
  tertiaryText,
  hideOverflow = false,
}) => (
  <div className={cx('List--ListItemText', hideOverflow && 'hide-overflow')}>
    <p className={cx('primary animated', boldPrimary && 'bold')}>
      {primaryText}
    </p>
    {secondaryText && <p className="secondary">{secondaryText}</p>}
    {tertiaryText && <p className="tertiary">{tertiaryText}</p>}
  </div>
);

export const ListItemLabel = ({ className, ...restProps }) => (
  <div className={cx('List--ListItemLabel', className)} {...restProps} />
);
