/**
 * Refs are React's escape hatch for mutable values that should *not*
 * participate in rendering. The compiler enforces this strictly: any read
 * or write of `ref.current` outside of an event handler or effect is a
 * compile-time error.
 *
 * The intent of this code — count how many times the component has rendered
 * — is fundamentally at odds with how the compiler thinks about render
 * functions. The fix is to move the increment into a `useEffect`, where
 * mutating refs is allowed.
 */
import { useRef } from 'react';

export default function RenderCounter() {
  const renders = useRef(0);
  renders.current += 1;
  return <div>Render #{renders.current}</div>;
}
