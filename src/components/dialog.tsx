import {
  DialogContent,
  DialogOverlay,
  DialogProps as ReachDialogProps,
} from '@reach/dialog';
import '@reach/dialog/styles.css';
import cx from 'classnames';
import * as React from 'react';
import './dialog.scss';
import { CloseIcon } from './svg-icons';

export type DialogProps = ReachDialogProps & {
  large?: boolean;
  heading?: React.ReactNode;
};

export const Dialog = ({
  onDismiss,
  isOpen,
  children,
  large,
  className,
  onKeyDown,
  heading,
  ...props
}: DialogProps) => {
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss} onKeyDown={onKeyDown}>
      <DialogContent
        className={cx(
          'rounded-lg relative',
          large && 'dialog--large',
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={onDismiss}
          className="dialog-close-btn p-2 text-gray-600 rounded-full focus:outline-none focus:shadow-outline-gray"
          aria-label="close"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
        {heading && (
          <div className="px-6 py-2 text-2xl border-b border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-400">
            {heading}
          </div>
        )}
        <div className="dialog-content">{children}</div>
      </DialogContent>
    </DialogOverlay>
  );
};
