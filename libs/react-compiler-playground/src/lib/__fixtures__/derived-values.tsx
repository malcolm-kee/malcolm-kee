/**
 * Shows the compiler's most basic unit of memoization: a value derived
 * from props (`greeting`) and the JSX that uses it are both cached, keyed
 * on `name`. If the parent re-renders with the same `name`, both the
 * string concatenation and the `<div>` element are reused from the cache.
 */
export default function Greeting({ name }: { name: string }) {
  const greeting = 'Hello, ' + name + '!';
  return <div>{greeting}</div>;
}
