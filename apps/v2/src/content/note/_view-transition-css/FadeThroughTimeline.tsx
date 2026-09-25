export default function FadeThroughTimeline() {
  return (
    <figure className="my-3 overflow-hidden rounded-2xl bg-white">
      <figcaption className="sr-only">
        <span>
          <span className="block font-semibold text-slate-900">Fade-through choreography</span>
          <span className="mt-0.5 block text-sm text-slate-600">
            Opacity hands off while movement continues.
          </span>
        </span>
      </figcaption>

      <div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-3 px-4 py-3 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-x-4">
        <div aria-hidden="true" />
        <div className="relative h-5 text-[0.6875rem] font-semibold tabular-nums text-slate-500 sm:text-xs">
          <span className="absolute bottom-0 left-[30%] -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-200 px-2 py-0.5 text-slate-700">
            handoff
          </span>
        </div>

        <div className="grid grid-rows-2 gap-3 py-1 text-xs leading-tight sm:text-sm">
          <div className="flex h-12 flex-col justify-center">
            <span className="font-semibold text-rose-700">
              Old<span className="hidden sm:inline"> snapshot</span>
            </span>
            <span className="text-slate-500">
              <span className="sm:hidden">1 → 0</span>
              <span className="hidden sm:inline">opacity 1 → 0</span>
            </span>
          </div>
          <div className="flex h-12 flex-col justify-center">
            <span className="font-semibold text-sky-700">
              New<span className="hidden sm:inline"> snapshot</span>
            </span>
            <span className="text-slate-500">
              <span className="sm:hidden">0 → 1</span>
              <span className="hidden sm:inline">opacity 0 → 1</span>
            </span>
          </div>
        </div>

        <div className="relative grid grid-rows-2 gap-3 py-1">
          <div className="pointer-events-none absolute inset-y-0 left-[30%] z-10 border-l border-dashed border-slate-500" />

          <div className="relative h-12 overflow-hidden rounded-xl bg-slate-100">
            <div className="absolute inset-y-1 left-1 w-[calc(30%_-_0.25rem)] rounded-lg bg-gradient-to-r from-rose-500 to-rose-500/0" />
          </div>

          <div className="relative h-12 overflow-hidden rounded-xl bg-slate-100">
            <div className="absolute inset-y-1 right-1 left-[calc(30%_+_0.25rem)] rounded-lg bg-gradient-to-r from-sky-500/0 to-sky-500" />
          </div>
        </div>
      </div>
    </figure>
  );
}
