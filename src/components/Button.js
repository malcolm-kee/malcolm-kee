import { Link } from 'gatsby';
import React from 'react';
import { joinClassName } from 'join-string';
import './Button.scss';

/**
 *
 * @param {Object} props
 * @param {'primary' | 'secondary'} [props.color]
 * @param {'small' | 'large'} [props.size]
 */
export const Button = ({
  component: Component = 'button',
  color = '',
  raised = false,
  size,
  className,
  children,
  type = Component === 'button' ? 'button' : undefined,
  fullWidth,
  ...restProps
}) => (
  <Component
    type={type}
    className={joinClassName(
      'btn',
      color && `btn-${color}`,
      size && `btn-${size}`,
      raised && 'btn-raised',
      fullWidth && 'btn-full-width',
      className
    )}
    {...restProps}
  >
    {children}
  </Component>
);

export const LinkButton = props => <Button component={Link} {...props} />;
