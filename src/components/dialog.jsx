import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import cx from 'classnames';
import React from 'react';
import { Button } from './Button';
import './dialog.scss';
import { CloseIcon } from './svg-icons';

export const Dialog = ({
  onDismiss,
  isOpen,
  children,
  large,
  className,
  BtnComponent = Button,
  btnProps,
  onKeyDown,
  ...props
}) => {
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss} onKeyDown={onKeyDown}>
      <DialogContent
        className={cx(large && 'dialog--large', className)}
        {...props}
      >
        <div className="dialog-content">
          <BtnComponent
            onClick={onDismiss}
            className="dialog-close-btn text-gray-600"
            size="small"
            aria-label="close"
            {...btnProps}
          >
            <CloseIcon />
          </BtnComponent>
          {children}
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};
