// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
/**
 * The same bug as `wrapped-date-now`, but with the helper moved to a
 * different module. This matters because the compiler's analysis is
 * strictly single-file: anything imported is a black box. It has no way
 * to know whether `getTimeNow` is pure or reads from the system clock,
 * so it assumes the friendliest possible thing — pure — and memoizes
 * the call.
 *
 * This is the most realistic failure mode of the three clock examples.
 * A product codebase will have utility modules like `lib/time.ts` full
 * of small wrappers. Any one of them can be an invisible impurity source
 * once the compiler turns on, and neither the compiler nor the linter
 * will warn you.
 */
import { getTimeNow } from './time';

export default function ExpiryNotice(props) {
  const slots = useMemoCache(8);
  const { message } = props;
  let t1;
  let t2;
  let t3;
  if (slots[0] !== message) {
    const ts = getTimeNow();

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
