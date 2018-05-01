import React from 'react';
import './Icon.scss';

export const Icon = ({
  type = 'material-icons',
  src = '',
  children,
  ...restProps
}) =>
  type === 'material-icons' ? (
    <i className="material-icons" {...restProps}>
      {children}
    </i>
  ) : type === 'image' ? (
    <img src={src} {...restProps} className="Icon--image" />
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
