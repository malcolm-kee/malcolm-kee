import React from 'react';
import { copyToClipboard } from '../helper';
import { useTransientState } from '../hooks/use-transient-state';
import { Button } from './Button';

export function CopyButton({
  contentToCopy,
  label = 'Copy',
  copiedMessage = 'Copied!',
}) {
  const [showMessage, setShowMessage] = useTransientState(false);

  function copy() {
    copyToClipboard(contentToCopy);
    setShowMessage(true);
  }

  return (
    <Button onClick={copy} color="white" className="text-sm" raised>
      {showMessage ? copiedMessage : label}
    </Button>
  );
}
