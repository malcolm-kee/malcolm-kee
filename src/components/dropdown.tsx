import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuItemProps,
  MenuItems,
  MenuPopover,
} from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { positionDefault, positionRight } from '@reach/popover';
import cx from 'classnames';
import * as React from 'react';
import { Button } from './Button';
import './dropdown.css';
import { IconButton } from './icon-button';

export type DropdownProps = {
  label: React.ReactNode;
  icon?: boolean;
  alignRight?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
} & Omit<MenuButtonProps, 'children'>;

export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  function Dropdown(
    { icon, label, alignRight, children, ...buttonProps },
    forwardedRef
  ) {
    return (
      <Menu>
        <MenuButton
          {...buttonProps}
          as={icon ? IconButton : Button}
          ref={forwardedRef}
        >
          {label}
        </MenuButton>
        <MenuPopover
          position={alignRight ? positionRight : positionDefault}
          className="rounded-md shadow-lg py-0 overflow-hidden z-10"
        >
          <div className="rounded-md bg-white shadow-xs font-sans">
            <MenuItems className="py-0.5 border-none">{children}</MenuItems>
          </div>
        </MenuPopover>
      </Menu>
    );
  }
);

export const DropdownOption = (
  props: MenuItemProps & React.ComponentPropsWithoutRef<'div'>
) => {
  return (
    <MenuItem
      {...props}
      className={cx(
        'block px-4 py-2 text-sm leading-5 text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-900',
        props.className
      )}
    />
  );
};
