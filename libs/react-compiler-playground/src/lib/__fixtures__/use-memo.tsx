import { useMemo } from 'react';

/**
 * What happens to pre-existing `useMemo` calls? The compiler keeps them
 * working, but its own memoization subsumes them: notice in the output
 * that the filter callback, the filtered array, the mapped `<li>` list,
 * and the wrapping `<ul>` each get their own cache slot. In code written
 * for the compiler, the explicit `useMemo` becomes redundant.
 */
export default function ExpensiveList({ items, query }: { items: string[]; query: string }) {
  const filtered = useMemo(
    () => items.filter((item) => item.includes(query)),
    [items, query]
  );

  return (
    <ul>
      {filtered.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
