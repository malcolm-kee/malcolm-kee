// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
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

export default function ExpiryNotice(props) {
  const slots = useMemoCache(8);
  const { message } = props;
  let t1;
  let t2;
  let t3;
  if (slots[0] !== message) {
    const ts = now();

    t1 = message;
    t2 = ' (as of ';
    t3 = new Date(ts).toLocaleTimeString();
    slots[0] = message;
    slots[1] = t1;
    slots[2] = t2;
    slots[3] = t3;
  } else {
    t1 = slots[1];
    t2 = slots[2];
    t3 = slots[3];
  }
  let t4;
  if (
    slots[4] !== t1 ||
    slots[5] !== t2 ||
    slots[6] !== t3
  ) {
    t4 = (
      <div>
        {t1}
        {t2}
        {t3})
      </div>
    );

    slots[4] = t1;
    slots[5] = t2;
    slots[6] = t3;
    slots[7] = t4;
  } else {
    t4 = slots[7];
  }
  return t4;
}
