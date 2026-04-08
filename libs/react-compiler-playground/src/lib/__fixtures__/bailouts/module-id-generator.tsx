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

export default function Row({ label }: { label: string }) {
  const id = getNextId();
  return <div data-id={id}>{label}</div>;
}
