import { lazy, Suspense } from 'react';
import { EditorSkeleton } from './EditorSkeleton';

const EditorImpl = lazy(() => import('./EditorImpl'));

export function Editor() {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <EditorImpl />
    </Suspense>
  );
}
