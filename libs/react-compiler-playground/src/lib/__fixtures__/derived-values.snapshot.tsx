// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
/**
 * Shows the compiler's most basic unit of memoization: a value derived
 * from props (`greeting`) and the JSX that uses it are both cached, keyed
 * on `name`. If the parent re-renders with the same `name`, both the
 * string concatenation and the `<div>` element are reused from the cache.
 */
export default function Greeting(props) {
  const slots = useMemoCache(2);
  const { name } = props;
  const greeting = 'Hello, ' + name + '!';
  let t1;
  if (slots[0] !== greeting) {
    t1 = <div>{greeting}</div>;
    slots[0] = greeting;
    slots[1] = t1;
  } else {
    t1 = slots[1];
  }
  return t1;
}
