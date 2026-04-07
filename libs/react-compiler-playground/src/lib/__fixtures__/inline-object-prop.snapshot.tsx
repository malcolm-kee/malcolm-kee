// @ts-nocheck
import { c as createMemoCache } from 'react/compiler-runtime';
import { useState } from 'react';

type UserCardProps = {
  user: { name: string; email: string };
  theme: { dark: boolean };
};

declare function UserCard(props: UserCardProps): JSX.Element;

/**
 * Object and array literals in JSX are a classic source of wasted renders:
 * `{ name, email }` is a new reference every render, so a memoized
 * `UserCard` would still re-render. The compiler memoizes these literals
 * so the reference is stable when their inputs don't change.
 */
export default function Profile(props) {
  const memoCache = createMemoCache(13);
  const { name, email } = props;
  const [dark, setDark] = useState(false);
  let t1;
  if (memoCache[0] !== email || memoCache[1] !== name) {
    t1 = { name, email };
    memoCache[0] = email;
    memoCache[1] = name;
    memoCache[2] = t1;
  } else {
    t1 = memoCache[2];
  }
  let t2;
  if (memoCache[3] !== dark) {
    t2 = { dark };
    memoCache[3] = dark;
    memoCache[4] = t2;
  } else {
    t2 = memoCache[4];
  }
  let t3;
  if (memoCache[5] !== t1 || memoCache[6] !== t2) {
    t3 = <UserCard user={t1} theme={t2} />;
    memoCache[5] = t1;
    memoCache[6] = t2;
    memoCache[7] = t3;
  } else {
    t3 = memoCache[7];
  }
  let t4;
  if (memoCache[8] !== dark) {
    t4 = <button onClick={() => setDark(!dark)}>Toggle theme</button>;
    memoCache[8] = dark;
    memoCache[9] = t4;
  } else {
    t4 = memoCache[9];
  }
  let t5;
  if (memoCache[10] !== t3 || memoCache[11] !== t4) {
    t5 = (
      <>
        {t3}
        {t4}
      </>
    );

    memoCache[10] = t3;
    memoCache[11] = t4;
    memoCache[12] = t5;
  } else {
    t5 = memoCache[12];
  }
  return t5;
}
const IS_UNINITIALIZED = Symbol.for('react.memo_cache_sentinel');
