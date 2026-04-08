/**
 * The compiler decides what to optimize by *name*: only functions whose name
 * starts with an uppercase letter (or `use` for hooks) are treated as React
 * code. Lowercase function names are silently skipped — no error, no warning,
 * no memoization. The output is byte-for-byte the input.
 *
 * This is the most embarrassing bailout to debug because everything compiles,
 * the app renders fine, and yet the component is completely uncached. The
 * fix is just to capitalize the name.
 */
export default function greeting({ name }: { name: string }) {
  const message = 'Hello, ' + name + '!';
  return <div>{message}</div>;
}
