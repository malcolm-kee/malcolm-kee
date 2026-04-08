// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
import { useState } from 'react';

/**
 * Before the compiler, the inline `onClick` would be a fresh function on
 * every render, defeating memoization of any child that received it. The
 * compiler caches the handler for us — no `useCallback` needed.
 */
export default function Counter() {
  const slots = useMemoCache(5);
  const [count, setCount] = useState(0);
  let t0;
  if (slots[0] !== count) {
    t0 = () => setCount(count + 1);
    slots[0] = count;
    slots[1] = t0;
  } else {
    t0 = slots[1];
  }
  let t1;
  if (slots[2] !== count || slots[3] !== t0) {
    t1 = (
      <button onClick={t0}>
        Clicked
        {count} times
      </button>
    );

    slots[2] = count;
    slots[3] = t0;
    slots[4] = t1;
  } else {
    t1 = slots[4];
  }
  return t1;
}
