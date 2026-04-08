// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
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
export default function ExpiryNotice(props) {
  const slots = useMemoCache(8);
  const { message } = props;
  let t1;
  let t2;
  let t3;
  if (slots[0] !== message) {
    const ts = Date.now();

    t1 = message;
    t2 = ' (as of ';
    t3 = new Date(ts).toLocaleTimeString();
    slots[0] = message;
    slots[1] = t1;
    slots[2] = t2;
    slots[3] = t3;
  } else {
    t1 = slots[1];
    t2 = slots[2];
    t3 = slots[3];
  }
  let t4;
  if (
    slots[4] !== t1 ||
    slots[5] !== t2 ||
    slots[6] !== t3
  ) {
    t4 = (
      <div>
        {t1}
        {t2}
        {t3})
      </div>
    );

    slots[4] = t1;
    slots[5] = t2;
    slots[6] = t3;
    slots[7] = t4;
  } else {
    t4 = slots[7];
  }
  return t4;
}

/**
 * Linter reported:
 *
 * Error: Cannot call impure function during render. `Date.now` is an impure function. Calling an impure function can produce unstable results that update unpredictably when the component happens to re-render. (https://react.dev/reference/rules/components-and-hooks-must-be-pure#components-and-hooks-must-be-idempotent). (15:13)
 */
