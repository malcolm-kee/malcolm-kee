// @ts-nocheck
import { c as createMemoCache } from 'react/compiler-runtime';

/**
 * What happens to pre-existing `useMemo` calls? The compiler keeps them
 * working, but its own memoization subsumes them: notice in the output
 * that the filter callback, the filtered array, the mapped `<li>` list,
 * and the wrapping `<ul>` each get their own cache slot. In code written
 * for the compiler, the explicit `useMemo` becomes redundant.
 */
export default function ExpensiveList(props) {
  const memoCache = createMemoCache(9);
  const { items, query } = props;
  let t1;
  if (memoCache[0] !== items || memoCache[1] !== query) {
    let t2;
    if (memoCache[3] !== query) {
      t2 = (item) => item.includes(query);
      memoCache[3] = query;
      memoCache[4] = t2;
    } else {
      t2 = memoCache[4];
    }
    t1 = items.filter(t2);
    memoCache[0] = items;
    memoCache[1] = query;
    memoCache[2] = t1;
  } else {
    t1 = memoCache[2];
  }
  const filtered = t1;
  let t2;
  if (memoCache[5] !== filtered) {
    t2 = filtered.map(_temp);
    memoCache[5] = filtered;
    memoCache[6] = t2;
  } else {
    t2 = memoCache[6];
  }
  let t3;
  if (memoCache[7] !== t2) {
    t3 = <ul>{t2}</ul>;
    memoCache[7] = t2;
    memoCache[8] = t3;
  } else {
    t3 = memoCache[8];
  }
  return t3;
}
function _temp(item_0) {
  return <li key={item_0}>{item_0}</li>;
}
const IS_UNINITIALIZED = Symbol.for('react.memo_cache_sentinel');
