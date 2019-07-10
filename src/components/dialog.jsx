import { Dialog as ReachDialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import React from 'react';
import { CloseIcon } from './svg-icons';
import { Button } from './Button';
import './dialog.scss';

export const Dialog = ({ onDismiss, isOpen, children, ...props }) => {
  return (
    <ReachDialog onDismiss={onDismiss} isOpen={isOpen} {...props}>
      <div className="dialog-content">
        <Button onClick={onDismiss} className="dialog-close-btn" size="small">
          <CloseIcon />
        </Button>
        {children}
      </div>
    </ReachDialog>
  );
};
