import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure';
import * as React from 'react';
import { Button } from './Button';
import { ErrorBoundary } from './error-boundary';

const DiscuqComments = React.lazy(() => import('./discqus-comments'));

export type FriendlyCommentsProps = {
  identifier: string;
  title: string;
  url: string;
};

export const FriendlyComments = (props: FriendlyCommentsProps) => {
  return (
    <Disclosure>
      <div>
        <DisclosureButton
          as={Button}
          className="border border-gray-500 dark:border-gray-100"
          minWidth="widest"
          raised
        >
          Comments
        </DisclosureButton>
      </div>
      <DisclosurePanel>
        <React.Suspense fallback="Loading...">
          <ErrorBoundary>
            <DiscuqComments {...props} />
          </ErrorBoundary>
        </React.Suspense>
      </DisclosurePanel>
    </Disclosure>
  );
};
