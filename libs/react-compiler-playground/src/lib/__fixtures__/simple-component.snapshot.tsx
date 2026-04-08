// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
/**
 * The simplest possible case: a component with no props and constant JSX.
 * This is the baseline transformation — useful as a first example because
 * there's nothing to memoize *on*. The compiler still wraps the `<div>`
 * in a cache slot guarded by the `UNINITIALIZED` sentinel, so the JSX
 * element is created exactly once and reused on every subsequent render.
 */
export default function MyApp() {
  const slots = useMemoCache(1);
  let t0;
  if (slots[0] === UNINITIALIZED) {
    t0 = <div>Hello World</div>;
    slots[0] = t0;
  } else {
    t0 = slots[0];
  }
  return t0;
}
const UNINITIALIZED = Symbol.for(
  'react.memo_cache_sentinel'
);
