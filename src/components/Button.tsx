import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import './Button.scss';

interface BaseButtonProps {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'large';
  minWidth?: 'wide' | 'wider' | 'widest';
  raised?: boolean;
}

interface NativeButtonProps
  extends BaseButtonProps,
    Omit<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      'color'
    > {
  component?: 'button';
  type?: 'button' | 'submit' | 'reset';
}

interface LinkButtonProps
  extends BaseButtonProps,
    Omit<React.ComponentProps<typeof Link>, 'color' | 'type' | 'ref'> {
  component: typeof Link;
}

type ButtonProps = NativeButtonProps | LinkButtonProps;

const isButtonProps = (props: ButtonProps): props is NativeButtonProps =>
  !props.component || props.component === 'button';

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLLinkElement,
  ButtonProps
>((props, ref) => {
  if (isButtonProps(props)) {
    const {
      color,
      raised,
      type = 'button',
      size,
      className,
      minWidth,
      ...restProps
    } = props;

    return (
      <button
        className={cx(
          'btn',
          color && `btn-${color}`,
          size && `btn-${size}`,
          raised && 'btn-raised',
          minWidth && `btn-${minWidth}`,
          className
        )}
        {...restProps}
        ref={ref as React.Ref<HTMLButtonElement>}
      />
    );
  } else {
    const {
      color,
      raised,
      size,
      className,
      minWidth,
      component: Component,
      ...restProps
    } = props;

    return (
      <Component
        className={cx(
          'btn',
          color && `btn-${color}`,
          size && `btn-${size}`,
          raised && 'btn-raised',
          minWidth && `btn-${minWidth}`,
          className
        )}
        {...restProps}
      />
    );
  }
});

export const LinkButton: React.FC<
  Omit<LinkButtonProps, 'component'>
> = props => <Button component={Link} {...props} />;
