/**
 * If you already have `render-time-clock`, the obvious instinct is to
 * "move `Date.now()` behind a helper so it's easier to mock". Compare this
 * snapshot to `render-time-clock.snapshot.tsx`: the generated code is
 * identical, slot-for-slot. Same bug, same stale timestamp cached against
 * `message`.
 *
 * The only thing that changed is the linter output. `validateNoImpureFunctionsInRender`
 * matches `Date.now` by name at the call site, and a one-line wrapper is
 * enough to dodge it. The bug is exactly as bad as before, but now the
 * one tool that would have pointed at it has nothing to say.
 */
const now = () => Date.now();

export default function ExpiryNotice({ message }: { message: string }) {
  const ts = now();
  return (
    <div>
      {message} (as of {new Date(ts).toLocaleTimeString()})
    </div>
  );
}
