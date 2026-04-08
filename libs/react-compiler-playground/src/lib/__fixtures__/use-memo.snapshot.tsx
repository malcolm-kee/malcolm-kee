// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';

/**
 * What happens to pre-existing `useMemo` calls? The compiler keeps them
 * working, but its own memoization subsumes them: notice in the output
 * that the filter callback, the filtered array, the mapped `<li>` list,
 * and the wrapping `<ul>` each get their own cache slot. In code written
 * for the compiler, the explicit `useMemo` becomes redundant.
 */
export default function ExpensiveList(props) {
  const slots = useMemoCache(9);
  const { items, query } = props;
  let t1;
  if (slots[0] !== items || slots[1] !== query) {
    let t2;
    if (slots[3] !== query) {
      t2 = (item) => item.includes(query);
      slots[3] = query;
      slots[4] = t2;
    } else {
      t2 = slots[4];
    }
    t1 = items.filter(t2);
    slots[0] = items;
    slots[1] = query;
    slots[2] = t1;
  } else {
    t1 = slots[2];
  }
  const filtered = t1;
  let t2;
  if (slots[5] !== filtered) {
    t2 = filtered.map(_temp);
    slots[5] = filtered;
    slots[6] = t2;
  } else {
    t2 = slots[6];
  }
  let t3;
  if (slots[7] !== t2) {
    t3 = <ul>{t2}</ul>;
    slots[7] = t2;
    slots[8] = t3;
  } else {
    t3 = slots[8];
  }
  return t3;
}
function _temp(item_0) {
  return <li key={item_0}>{item_0}</li>;
}
