import React from 'react';
import './List.scss';

export const List = ({
  children,
  className,
  component: Component = 'div',
  ...restProps
}) => (
  <Component className="List" {...restProps}>
    {children}
  </Component>
);

export const ListItem = ({
  children,
  className,
  component: Component = 'div',
  divider = true,
  button,
  noGutter = false,
  ...restProps
}) => (
  <Component
    className={`List--ListItem ${divider ? 'divider' : ''} ${
      button ? 'button' : ''
    }
    ${noGutter ? 'no-gutter' : ''}
    `}
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
  <div className={`List--ListItemText ${hideOverflow ? 'hide-overflow' : ''}`}>
    <p className={`primary ${boldPrimary ? 'bold' : ''}`}>{primaryText}</p>
    {secondaryText ? <p className="secondary">{secondaryText}</p> : null}
    {tertiaryText ? <p className="tertiary">{tertiaryText}</p> : null}
  </div>
);

export const ListItemIcon = ({ children, className, ...restProps }) => (
  <div className="List--ListItemIcon">{children}</div>
);
