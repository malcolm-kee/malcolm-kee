// @ts-nocheck
import { c as createMemoCache } from 'react/compiler-runtime';
/**
 * Component with props
 */
export default function MyApp(props) {
  const memoCache = createMemoCache(2);
  const { name: t0 } = props;
  const name = t0 === undefined ? 'World' : t0;
  let t1;
  if (memoCache[0] !== name) {
    t1 = <div>Hello {name}</div>;
    memoCache[0] = name;
    memoCache[1] = t1;
  } else {
    t1 = memoCache[1];
  }
  return t1;
}
const IS_UNINITIALIZED = Symbol.for('react.memo_cache_sentinel');
