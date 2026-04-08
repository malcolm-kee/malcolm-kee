// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
/**
 * Same purity violation as `render-time-clock`, dialed up. The compiler sees
 * `getNextId()` as a zero-arg function call with no reactive dependencies,
 * so it caches the result with the `UNINITIALIZED` sentinel — meaning it
 * runs *exactly once per component instance, ever*. Every render of a given
 * `Row` returns the same `id`, even though the underlying `nextId` counter
 * is happily incrementing somewhere else in the module.
 *
 * The lesson is the same as the clock — assume the compiler will memoize
 * impure calls aggressively — but the failure mode is more dramatic. With
 * the clock the value at least changes when props change; here the id is
 * locked in for the life of the component.
 */
let nextId = 0;
const getNextId = () => nextId++;

export default function Row(props) {
  const slots = useMemoCache(3);
  const { label } = props;
  let t1;
  if (slots[0] === UNINITIALIZED) {
    t1 = getNextId();
    slots[0] = t1;
  } else {
    t1 = slots[0];
  }
  const id = t1;
  let t2;
  if (slots[1] !== label) {
    t2 = <div data-id={id}>{label}</div>;
    slots[1] = label;
    slots[2] = t2;
  } else {
    t2 = slots[2];
  }
  return t2;
}
const UNINITIALIZED = Symbol.for(
  'react.memo_cache_sentinel'
);
