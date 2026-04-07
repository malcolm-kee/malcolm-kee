// @ts-nocheck
import { c as createMemoCache } from 'react/compiler-runtime';
import { useState } from 'react';

/**
 * Before the compiler, the inline `onClick` would be a fresh function on
 * every render, defeating memoization of any child that received it. The
 * compiler caches the handler for us — no `useCallback` needed.
 */
export default function Counter() {
  const memoCache = createMemoCache(5);
  const [count, setCount] = useState(0);
  let t0;
  if (memoCache[0] !== count) {
    t0 = () => setCount(count + 1);
    memoCache[0] = count;
    memoCache[1] = t0;
  } else {
    t0 = memoCache[1];
  }
  let t1;
  if (memoCache[2] !== count || memoCache[3] !== t0) {
    t1 = (
      <button onClick={t0}>
        Clicked
        {count} times
      </button>
    );

    memoCache[2] = count;
    memoCache[3] = t0;
    memoCache[4] = t1;
  } else {
    t1 = memoCache[4];
  }
  return t1;
}
const IS_UNINITIALIZED = Symbol.for('react.memo_cache_sentinel');
