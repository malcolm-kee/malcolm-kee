import cx from 'classnames';
import * as React from 'react';

export type IconButtonProps = React.ComponentPropsWithoutRef<'button'>;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ type = 'button', children, ...buttonProps }, ref) {
    const child =
      children && React.isValidElement(children)
        ? React.cloneElement(children, {
            className: 'w-5 h-5 fill-current',
          })
        : children;

    return (
      <button
        type={type}
        {...buttonProps}
        className={cx(
          'inline-flex justify-center items-center rounded-full p-1.5 focus:outline-none focus:shadow-outline-gray',
          buttonProps.disabled && 'cursor-default',
          buttonProps.className
        )}
        ref={ref}
      >
        {child}
      </button>
    );
  }
);
