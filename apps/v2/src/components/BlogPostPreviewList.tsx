import { clsx } from 'clsx';
import * as React from 'react';

export const BlogPostPreviewList = (
  props: React.ComponentPropsWithoutRef<'div'>
) => {
  return (
    <div className={clsx('@container/bloglist', props.className)}>
      <div
        {...props}
        className={clsx(
          'flex flex-col gap-8 @md/bloglist:border-l-2 @md/bloglist:border-l-zinc-100',
          props.className
        )}
      />
    </div>
  );
};
