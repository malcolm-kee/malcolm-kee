/**
 * Mutating a module-level binding from inside a component is a Rules of
 * React violation (render functions must be pure), but the interesting
 * thing here is the *shape* of the error: the compiler doesn't say "you
 * mutated a global, that's not allowed". It says "Todo: Support
 * UpdateExpression where argument is a global". The compiler simply has not
 * implemented support for this construct yet.
 *
 * It's worth knowing that some of the compiler's errors are genuine bug
 * detections and some are unimplemented cases. Both end the same way — no
 * memoization — but the underlying reason matters when you're deciding
 * whether to refactor or wait for a future compiler release.
 */
let renderCount = 0;

export default function Tracker() {
  renderCount++;
  return <div>Total renders: {renderCount}</div>;
}
