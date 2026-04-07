import type { JSX } from 'react';

export function EditorSkeleton(): JSX.Element {
  return (
    <div
      className="relative flex top-[var(--rcp-header-height)] !h-[calc(var(--rcp-height)_-_var(--rcp-header-height))]"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading editor"
    >
      {/* Collapsed config rail — matches <CollapsedEditor /> width */}
      <div className="flex-shrink-0 w-4 h-full" />

      <div className="flex flex-1 min-w-0">
        {/* Input pane — matches <Input /> */}
        <SkeletonPane title="Input" />
        {/* Output pane — matches <Output /> */}
        <SkeletonPane title="Output" tabCount={3} />
      </div>
    </div>
  );
}

function SkeletonPane({ title, tabCount = 1 }: { title: string; tabCount?: number }): JSX.Element {
  return (
    <div className="flex-1 min-w-[550px] sm:min-w-0 border-r border-gray-200 last:border-r-0">
      <div className="flex flex-col h-full">
        {/* Tab bar placeholder */}
        <div className="flex items-center gap-4 px-3 h-12 border-b border-gray-200 bg-gray-50">
          {Array.from({ length: tabCount }).map((_, index) => (
            <div className="h-8 w-16 rounded-full bg-gray-200 animate-pulse" key={index} />
          ))}
          <span className="sr-only">{title} loading</span>
        </div>
        {/* Code body placeholder */}
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          <SkeletonLine width="w-3/5" />
          <SkeletonLine width="w-4/5" indent />
          <SkeletonLine width="w-2/5" indent />
          <SkeletonLine width="w-3/4" indent />
          <SkeletonLine width="w-1/3" />
          <SkeletonLine width="w-2/3" indent />
          <SkeletonLine width="w-1/2" indent />
          <SkeletonLine width="w-3/5" />
        </div>
      </div>
    </div>
  );
}

function SkeletonLine({ width, indent = false }: { width: string; indent?: boolean }): JSX.Element {
  return (
    <div className={`flex items-center gap-3 ${indent ? 'pl-6' : ''}`}>
      <div className="h-3 w-6 rounded bg-gray-100 animate-pulse" aria-hidden />
      <div className={`h-3 rounded bg-gray-200 animate-pulse ${width}`} />
    </div>
  );
}
