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
export default function List({ items }: { items: string[] }) {
  function Row({ label }: { label: string }) {
    return <li>{label}</li>;
  }

  return (
    <ul>
      {items.map((item) => (
        <Row key={item} label={item} />
      ))}
    </ul>
  );
}
