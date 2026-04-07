import { useState, JSX } from 'react';

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
export default function Profile({ name, email }: { name: string; email: string }) {
  const [dark, setDark] = useState(false);

  return (
    <>
      <UserCard user={{ name, email }} theme={{ dark }} />
      <button onClick={() => setDark(!dark)}>Toggle theme</button>
    </>
  );
}
