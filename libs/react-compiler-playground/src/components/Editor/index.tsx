import { lazy, Suspense } from 'react';
import { EditorSkeleton } from './EditorSkeleton';
import type { EditorProps } from './EditorImpl';

export type { EditorProps } from './EditorImpl';

const EditorImpl = lazy(() => import('./EditorImpl'));

export function Editor(props: EditorProps) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <EditorImpl {...props} />
    </Suspense>
  );
}
