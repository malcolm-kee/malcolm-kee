import * as React from 'react';
import { useTransientState } from '../hooks/use-transient-state';
import { copyText, isShareSupported, share } from '../lib/dom';
import { Button, NativeButtonProps } from './Button';

type ShareButtonProps = {
  details: NavigatorShareOption;
  children?: React.ReactNode;
} & Omit<NativeButtonProps, 'ref'>;

export const ShareButton = ({
  details,
  children = 'Share',
  ...props
}: ShareButtonProps) => {
  const [status, setStatus] = useTransientState<Status>('idle');

  const shareDetails = () => {
    if (isShareSupported()) {
      share(details).then(() => setStatus('shared'));
    } else {
      copyText(details.url).then(() => setStatus('copied'));
    }
  };

  return (
    <Button onClick={shareDetails} color="primary" raised {...props}>
      {status === 'idle'
        ? children
        : status === 'shared'
        ? 'Shared!'
        : 'URL Copied!'}
    </Button>
  );
};

type Status = 'shared' | 'idle' | 'copied';
