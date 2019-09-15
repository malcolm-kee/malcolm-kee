import cx from 'classnames';
import { Dialog as ReachDialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import React from 'react';
import { CloseIcon } from './svg-icons';
import { Button } from './Button';
import './dialog.scss';

export const Dialog = ({
  onDismiss,
  isOpen,
  children,
  large,
  className,
  BtnComponent = Button,
  btnProps,
  ...props
}) => {
  return (
    <ReachDialog
      className={cx(large && 'dialog--large', className)}
      onDismiss={onDismiss}
      isOpen={isOpen}
      {...props}
    >
      <div className="dialog-content">
        <BtnComponent
          onClick={onDismiss}
          className="dialog-close-btn"
          size="small"
          aria-label="close"
          {...btnProps}
        >
          <CloseIcon />
        </BtnComponent>
        {children}
      </div>
    </ReachDialog>
  );
};
