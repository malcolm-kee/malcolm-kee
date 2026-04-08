// @ts-nocheck
import { c as useMemoCache } from 'react/compiler-runtime';
/**
 * A trap for anyone coming to React from a procedural error-handling
 * background. It looks like the right thing: "if rendering the widget
 * throws, show a fallback". It isn't. JSX is a description of work to
 * do, not the work itself — `<Widget data={data} />` just allocates an
 * object, it doesn't run the component. The actual render happens later,
 * outside this `try`, so an error inside `Widget` will escape every time.
 *
 * Unlike the impurity bailouts, the compiler still emits memoized code
 * for this function — look at the snapshot, it's a normal useMemoCache
 * transform. The value is entirely in the linter diagnostic: it points
 * at the JSX expression inside `try` and nudges the developer toward an
 * error boundary, which is React's actual mechanism for catching
 * render-time errors.
 */
type Widget = { data: unknown };

declare function Widget(props: Widget): JSX.Element;
declare function parse(raw: string): unknown;

export default function SafeWidget(props) {
  const slots = useMemoCache(5);
  const { raw } = props;
  try {
    let t1;
    if (slots[0] !== raw) {
      t1 = parse(raw);
      slots[0] = raw;
      slots[1] = t1;
    } else {
      t1 = slots[1];
    }
    const data = t1;
    let t2;
    if (slots[2] !== data) {
      t2 = <Widget data={data} />;
      slots[2] = data;
      slots[3] = t2;
    } else {
      t2 = slots[3];
    }
    return t2;
  } catch {
    let t1;
    if (slots[4] === UNINITIALIZED) {
      t1 = <div>Failed to load widget</div>;
      slots[4] = t1;
    } else {
      t1 = slots[4];
    }
    return t1;
  }
}
const UNINITIALIZED = Symbol.for(
  'react.memo_cache_sentinel'
);

/**
 * Linter reported:
 *
 * Error: Avoid constructing JSX within try/catch. React does not immediately render components when JSX is rendered, so any errors from this component will not be caught by the try/catch. To catch errors in rendering a given component, wrap that component in an error boundary. (https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary). (25:11)
 */
