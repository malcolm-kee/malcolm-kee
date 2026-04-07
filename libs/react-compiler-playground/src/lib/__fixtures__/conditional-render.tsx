type User = { name: string; age: number };

/**
 * Demonstrates how the compiler memoizes across branches. Each JSX block
 * below is cached independently with its own dependency set, so toggling
 * `user` between null and a value only rebuilds the branch that changed.
 */
export default function UserBadge({ user }: { user: User | null }) {
  if (!user) {
    return <span className="empty">No user</span>;
  }

  const isAdult = user.age >= 18;

  return (
    <div className="badge">
      <strong>{user.name}</strong>
      {isAdult ? <em>adult</em> : <em>minor</em>}
    </div>
  );
}
