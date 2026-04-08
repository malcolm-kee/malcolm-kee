/**
 * The classic "derived state" bug. The author wants `uppercase` to stay
 * in sync with `name`, and reaches for the tool they already know —
 * `useState` plus a setter call — instead of deriving the value inline.
 * At runtime this is an infinite render loop: every render calls
 * `setUppercase`, which schedules another render, which calls
 * `setUppercase` again.
 *
 * `validateNoSetStateInRender` catches the unconditional `setUppercase`
 * call and reports it. The fix is to not use state at all — just compute
 * `const uppercase = name.toUpperCase()` directly in the body, which
 * the compiler will happily memoize against the `name` prop.
 *
 * Note the narrow boundary of the check: it only flags calls that are
 * *unconditionally* reached on every render. Wrapping the same call in
 * `if (name !== lastName)` dodges the linter entirely, even though the
 * resulting code is still the anti-pattern React devs are warned away
 * from.
 */
import { useState } from 'react';

export default function Greeting({ name }: { name: string }) {
  const [uppercase, setUppercase] = useState('');
  setUppercase(name.toUpperCase());
  return <h1>Hello, {uppercase}!</h1>;
}
