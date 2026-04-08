import { useState } from 'react';

/**
 * Before the compiler, the inline `onClick` would be a fresh function on
 * every render, defeating memoization of any child that received it. The
 * compiler caches the handler for us — no `useCallback` needed.
 */
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
