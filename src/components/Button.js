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
      color,
      raised && 'raised',
      fullWidth && 'full-width',
      className
    )}
    {...restProps}
  >
    {children}
  </Component>
);
