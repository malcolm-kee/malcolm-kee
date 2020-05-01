import {
  DialogContent,
  DialogOverlay,
  DialogProps as ReachDialogProps,
} from '@reach/dialog';
import '@reach/dialog/styles.css';
import cx from 'classnames';
import * as React from 'react';
import { Button } from './Button';
import './dialog.scss';
import { CloseIcon } from './svg-icons';

export type DialogProps = ReachDialogProps & {
  large?: boolean;
};

export const Dialog = ({
  onDismiss,
  isOpen,
  children,
  large,
  className,
  onKeyDown,
  ...props
}: DialogProps) => {
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss} onKeyDown={onKeyDown}>
      <DialogContent
        className={cx(large && 'dialog--large', className)}
        {...props}
      >
        <div className="dialog-content">
          <Button
            onClick={onDismiss}
            className="dialog-close-btn text-gray-600"
            aria-label="close"
          >
            <CloseIcon />
          </Button>
          {children}
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};
