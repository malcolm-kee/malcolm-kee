// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
/**
 * Defining a component inside another component is a long-standing React
 * footgun: without the compiler, the inner function has a new identity on
 * every render, so React treats it as a different component type and
 * tears down the subtree — losing any state the inner component held.
 * The standard advice is "always hoist your components to module scope".
 *
 * The compiler relaxes that rule. Look at the snapshot: `Row` is assigned
 * into a memo cache slot with the `UNINITIALIZED` sentinel, so the inner
 * function is created exactly once per `List` instance and reused across
 * every render. React sees a stable component type, and any local state
 * inside `Row` survives re-renders of `List`.
 *
 * This does *not* mean the hoisting rule is obsolete — the fix still
 * matters for code that isn't compiled, and module-level components are
 * easier to test in isolation. But for freshly-written compiled code, the
 * pattern is no longer the silent bug it used to be.
 */
export default function List(props) {
  const slots = useMemoCache(6);
  const { items } = props;
  let t1;
  if (slots[0] === UNINITIALIZED) {
    t1 = function Row(props) {
      const { label } = props;
      return <li>{label}</li>;
    };
    slots[0] = t1;
  } else {
    t1 = slots[0];
  }
  const Row = t1;
  let t2;
  if (slots[1] !== items) {
    let t3;
    if (slots[3] === UNINITIALIZED) {
      t3 = (item) => <Row key={item} label={item} />;
      slots[3] = t3;
    } else {
      t3 = slots[3];
    }
    t2 = items.map(t3);
    slots[1] = items;
    slots[2] = t2;
  } else {
    t2 = slots[2];
  }
  let t3;
  if (slots[4] !== t2) {
    t3 = <ul>{t2}</ul>;
    slots[4] = t2;
    slots[5] = t3;
  } else {
    t3 = slots[5];
  }
  return t3;
}
const UNINITIALIZED = Symbol.for(
  'react.memo_cache_sentinel'
);
