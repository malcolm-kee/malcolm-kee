import React from 'react';
import { copyToClipboard } from '../helper';
import { Button } from './Button';
import { Popover, PopoverContent } from './popover';

export function CopyButton({ contentToCopy, label = 'Copy' }) {
  const [showPopup, setShowPopup] = React.useState(false);

  function copy() {
    copyToClipboard(contentToCopy);
    setShowPopup(true);
  }

  return (
    <Popover
      isOpen={showPopup}
      position="top"
      align="end"
      content={<PopoverContent>Copied to clipboard!</PopoverContent>}
      onClickOutside={() => setShowPopup(false)}
    >
      <Button onClick={copy} size="small" raised>
        {label}
      </Button>
    </Popover>
  );
}
