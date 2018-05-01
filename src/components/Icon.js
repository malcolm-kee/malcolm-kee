import React from 'react';
import './Icon.scss';

export const Icon = ({
  type = 'material-icons',
  src = '',
  oriSize = false,
  children,
  ...restProps
}) =>
  type === 'material-icons' ? (
    <i className="material-icons" {...restProps}>
      {children}
    </i>
  ) : type === 'image' ? (
    <img src={src} {...restProps} className={oriSize ? '' : 'Icon--image'} />
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
