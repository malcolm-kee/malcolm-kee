// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
type User = { name: string; age: number };

/**
 * Demonstrates how the compiler memoizes across branches. Each JSX block
 * below is cached independently with its own dependency set, so toggling
 * `user` between null and a value only rebuilds the branch that changed.
 */
export default function UserBadge(props) {
  const slots = useMemoCache(8);
  const { user } = props;
  if (!user) {
    let t1;
    if (slots[0] === UNINITIALIZED) {
      t1 = <span className="empty">No user</span>;
      slots[0] = t1;
    } else {
      t1 = slots[0];
    }
    return t1;
  }

  const isAdult = user.age >= 18;
  let t1;
  if (slots[1] !== user.name) {
    t1 = <strong>{user.name}</strong>;
    slots[1] = user.name;
    slots[2] = t1;
  } else {
    t1 = slots[2];
  }
  let t2;
  if (slots[3] !== isAdult) {
    t2 = isAdult ? <em>adult</em> : <em>minor</em>;
    slots[3] = isAdult;
    slots[4] = t2;
  } else {
    t2 = slots[4];
  }
  let t3;
  if (slots[5] !== t1 || slots[6] !== t2) {
    t3 = (
      <div className="badge">
        {t1}
        {t2}
      </div>
    );

    slots[5] = t1;
    slots[6] = t2;
    slots[7] = t3;
  } else {
    t3 = slots[7];
  }
  return t3;
}
const UNINITIALIZED = Symbol.for(
  'react.memo_cache_sentinel'
);
