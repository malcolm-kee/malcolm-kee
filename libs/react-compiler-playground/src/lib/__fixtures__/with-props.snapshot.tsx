// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
/**
 * Component with props
 */
export default function MyApp(props) {
  const slots = useMemoCache(2);
  const { name: t0 } = props;
  const name = t0 === undefined ? 'World' : t0;
  let t1;
  if (slots[0] !== name) {
    t1 = <div>Hello {name}</div>;
    slots[0] = name;
    slots[1] = t1;
  } else {
    t1 = slots[1];
  }
  return t1;
}
