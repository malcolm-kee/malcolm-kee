import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import './Button.scss';

/**
 *
 * @param {Object} props
 * @param {'primary' | 'secondary'} [props.color]
 * @param {'small' | 'large'} [props.size]
 * @param {'wide' | 'wider' | 'widest'} [props.minWidth]
 * @param {boolean} [props.raised]
 */
export const Button = ({
  component: Component = 'button',
  color,
  raised,
  size,
  className,
  children,
  type = Component === 'button' ? 'button' : undefined,
  minWidth,
  ...restProps
}) => (
  <Component
    type={type}
    className={cx(
      'btn',
      color && `btn-${color}`,
      size && `btn-${size}`,
      raised && 'btn-raised',
      minWidth && `btn-${minWidth}`,
      className
    )}
    {...restProps}
  >
    {children}
  </Component>
);

export const LinkButton = props => <Button component={Link} {...props} />;
