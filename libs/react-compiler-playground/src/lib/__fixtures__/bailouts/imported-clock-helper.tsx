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

export default function ExpiryNotice({ message }: { message: string }) {
  const ts = getTimeNow();
  return (
    <div>
      {message} (as of {new Date(ts).toLocaleTimeString()})
    </div>
  );
}
