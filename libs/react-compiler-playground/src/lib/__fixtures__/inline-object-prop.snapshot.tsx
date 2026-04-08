// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
import { useState } from 'react';

type UserCardProps = {
  user: { name: string; email: string };
  theme: { dark: boolean };
};

declare function UserCard(
  props: UserCardProps
): JSX.Element;

/**
 * Object and array literals in JSX are a classic source of wasted renders:
 * `{ name, email }` is a new reference every render, so a memoized
 * `UserCard` would still re-render. The compiler memoizes these literals
 * so the reference is stable when their inputs don't change.
 */
export default function Profile(props) {
  const slots = useMemoCache(13);
  const { name, email } = props;
  const [dark, setDark] = useState(false);
  let t1;
  if (slots[0] !== email || slots[1] !== name) {
    t1 = { name, email };
    slots[0] = email;
    slots[1] = name;
    slots[2] = t1;
  } else {
    t1 = slots[2];
  }
  let t2;
  if (slots[3] !== dark) {
    t2 = { dark };
    slots[3] = dark;
    slots[4] = t2;
  } else {
    t2 = slots[4];
  }
  let t3;
  if (slots[5] !== t1 || slots[6] !== t2) {
    t3 = <UserCard user={t1} theme={t2} />;
    slots[5] = t1;
    slots[6] = t2;
    slots[7] = t3;
  } else {
    t3 = slots[7];
  }
  let t4;
  if (slots[8] !== dark) {
    t4 = (
      <button onClick={() => setDark(!dark)}>
        Toggle theme
      </button>
    );

    slots[8] = dark;
    slots[9] = t4;
  } else {
    t4 = slots[9];
  }
  let t5;
  if (slots[10] !== t3 || slots[11] !== t4) {
    t5 = (
      <>
        {t3}
        {t4}
      </>
    );

    slots[10] = t3;
    slots[11] = t4;
    slots[12] = t5;
  } else {
    t5 = slots[12];
  }
  return t5;
}
