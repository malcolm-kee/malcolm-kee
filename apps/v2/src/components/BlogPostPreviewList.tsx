import { clsx } from 'clsx';
import * as React from 'react';

export const BlogPostPreviewList = (props: React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <div className={clsx('@container/bloglist', props.className)}>
      <div {...props} className={clsx('flex flex-col gap-10', props.className)} />
    </div>
  );
};
