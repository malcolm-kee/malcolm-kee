// @ts-nocheck
import { c as createMemoCache } from 'react/compiler-runtime';
type User = { name: string; age: number };

/**
 * Demonstrates how the compiler memoizes across branches. Each JSX block
 * below is cached independently with its own dependency set, so toggling
 * `user` between null and a value only rebuilds the branch that changed.
 */
export default function UserBadge(props) {
  const memoCache = createMemoCache(8);
  const { user } = props;
  if (!user) {
    let t1;
    if (memoCache[0] === IS_UNINITIALIZED) {
      t1 = <span className="empty">No user</span>;
      memoCache[0] = t1;
    } else {
      t1 = memoCache[0];
    }
    return t1;
  }

  const isAdult = user.age >= 18;
  let t1;
  if (memoCache[1] !== user.name) {
    t1 = <strong>{user.name}</strong>;
    memoCache[1] = user.name;
    memoCache[2] = t1;
  } else {
    t1 = memoCache[2];
  }
  let t2;
  if (memoCache[3] !== isAdult) {
    t2 = isAdult ? <em>adult</em> : <em>minor</em>;
    memoCache[3] = isAdult;
    memoCache[4] = t2;
  } else {
    t2 = memoCache[4];
  }
  let t3;
  if (memoCache[5] !== t1 || memoCache[6] !== t2) {
    t3 = (
      <div className="badge">
        {t1}
        {t2}
      </div>
    );

    memoCache[5] = t1;
    memoCache[6] = t2;
    memoCache[7] = t3;
  } else {
    t3 = memoCache[7];
  }
  return t3;
}
const IS_UNINITIALIZED = Symbol.for('react.memo_cache_sentinel');
