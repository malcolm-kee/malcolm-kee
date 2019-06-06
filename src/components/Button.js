import { Link } from 'gatsby';
import React from 'react';
import { joinClassName } from 'join-string';
import './Button.scss';

/**
 *
 * @param {Object} props
 * @param {'primary' | 'secondary'} [props.color]
 */
export const Button = ({
  component: Component = 'button',
  color = '',
  raised = false,
  large,
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
      raised && 'btn-raised',
      fullWidth && 'btn-full-width',
      large && 'btn-large',
      className
    )}
    {...restProps}
  >
    {children}
  </Component>
);

export const LinkButton = props => <Button component={Link} {...props} />;
