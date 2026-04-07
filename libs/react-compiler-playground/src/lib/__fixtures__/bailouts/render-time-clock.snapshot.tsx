// @ts-nocheck
import { c as createCache } from 'react/compiler-runtime';
/**
 * Calling an impure function during render — `Date.now()` here — is a Rules
 * of React violation, but the compiler has no way to know that. It treats
 * the result like any other derived value and pulls it into the cache slot
 * keyed on `message`. The consequence: `ts` is captured the first time the
 * component renders with a given `message`, and frozen there. Re-rendering
 * with the same `message` returns the cached JSX with the *original*
 * timestamp — the clock stops.
 *
 * Without the compiler, this clock at least updates every render. With the
 * compiler, memoization "works" so well that the bug becomes invisible.
 */
export default function ExpiryNotice(props) {
  const cache = createCache(8);
  const { message } = props;
  let t1;
  let t2;
  let t3;
  if (cache[0] !== message) {
    const ts = Date.now();

    t1 = message;
    t2 = ' (as of ';
    t3 = new Date(ts).toLocaleTimeString();
    cache[0] = message;
    cache[1] = t1;
    cache[2] = t2;
    cache[3] = t3;
  } else {
    t1 = cache[1];
    t2 = cache[2];
    t3 = cache[3];
  }
  let t4;
  if (cache[4] !== t1 || cache[5] !== t2 || cache[6] !== t3) {
    t4 = (
      <div>
        {t1}
        {t2}
        {t3})
      </div>
    );

    cache[4] = t1;
    cache[5] = t2;
    cache[6] = t3;
    cache[7] = t4;
  } else {
    t4 = cache[7];
  }
  return t4;
}
const UNINITIALIZED = Symbol.for('react.memo_cache_sentinel');
