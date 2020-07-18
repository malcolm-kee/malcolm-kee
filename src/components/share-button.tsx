import * as React from 'react';
import { useTransientState } from '../hooks/use-transient-state';
import { isShareSupported, share } from '../lib/dom';
import { Button, NativeButtonProps } from './Button';
import { Dialog } from './dialog';

const SocialMediaButtons = React.lazy(() => import('./social-media-buttons'));

type ShareButtonProps = {
  details: ShareData & { url: string };
  children?: React.ReactNode;
} & Omit<NativeButtonProps, 'ref'>;

export const ShareButton = ({
  details,
  children = 'Share',
  ...props
}: ShareButtonProps) => {
  const [status, setStatus] = useTransientState<Status>('idle');
  const [showCustomDialog, setShowCustomDialog] = React.useState(false);

  const shareDetails = () => {
    if (isShareSupported()) {
      share(details).then(() => setStatus('shared'));
    } else {
      setShowCustomDialog(true);
    }
  };

  return (
    <>
      <Button onClick={shareDetails} color="primary" raised {...props}>
        {status === 'idle'
          ? children
          : status === 'shared'
          ? 'Shared!'
          : 'URL Copied!'}
      </Button>
      <Dialog
        aria-label="Options of sharing"
        heading="Choose where to share"
        isOpen={showCustomDialog}
        onDismiss={() => setShowCustomDialog(false)}
        className="max-w-md"
      >
        <React.Suspense fallback={<>Loading...</>}>
          <div className="flex justify-between flex-wrap">
            <SocialMediaButtons
              details={details}
              onDone={() => setShowCustomDialog(false)}
            />
          </div>
        </React.Suspense>
      </Dialog>
    </>
  );
};

type Status = 'shared' | 'idle' | 'copied';
