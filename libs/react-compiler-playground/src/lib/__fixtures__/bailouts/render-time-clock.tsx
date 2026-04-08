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
export default function ExpiryNotice({ message }: { message: string }) {
  const ts = Date.now();
  return (
    <div>
      {message} (as of {new Date(ts).toLocaleTimeString()})
    </div>
  );
}
