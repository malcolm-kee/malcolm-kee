// @ts-nocheck
import { c as createMemoCache } from 'react/compiler-runtime';
/**
 * The simplest possible case: a component with no props and constant JSX.
 * This is the baseline transformation — useful as a first example because
 * there's nothing to memoize *on*. The compiler still wraps the `<div>`
 * in a cache slot guarded by the `IS_UNINITIALIZED` sentinel, so the JSX
 * element is created exactly once and reused on every subsequent render.
 */
export default function MyApp() {
  const memoCache = createMemoCache(1);
  let t0;
  if (memoCache[0] === IS_UNINITIALIZED) {
    t0 = <div>Hello World</div>;
    memoCache[0] = t0;
  } else {
    t0 = memoCache[0];
  }
  return t0;
}
const IS_UNINITIALIZED = Symbol.for('react.memo_cache_sentinel');
