/**
 * The simplest possible case: a component with no props and constant JSX.
 * This is the baseline transformation — useful as a first example because
 * there's nothing to memoize *on*. The compiler still wraps the `<div>`
 * in a cache slot guarded by the `UNINITIALIZED` sentinel, so the JSX
 * element is created exactly once and reused on every subsequent render.
 */
export default function MyApp() {
  return <div>Hello World</div>;
}
