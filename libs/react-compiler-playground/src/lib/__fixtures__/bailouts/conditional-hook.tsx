/**
 * The canonical Rules of Hooks violation. The compiler catches it the same
 * way ESLint does — at compile time, with a hard error. No code is emitted.
 *
 * The fix is to call hooks unconditionally and branch on the *result*:
 * call `useState` at the top, then conditionally render `null` based on
 * `userId`. The compiler will then happily memoize each branch.
 */
import { useState, useEffect } from 'react';

export default function Profile({ userId }: { userId: string | null }) {
  if (!userId) return null;

  const [name, setName] = useState('');
  useEffect(() => {
    fetch(`/users/${userId}`)
      .then((r) => r.json())
      .then((u) => setName(u.name));
  }, [userId]);

  return <div>{name}</div>;
}
