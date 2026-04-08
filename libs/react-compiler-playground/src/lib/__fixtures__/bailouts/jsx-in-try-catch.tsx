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

export default function SafeWidget({ raw }: { raw: string }) {
  try {
    const data = parse(raw);
    return <Widget data={data} />;
  } catch {
    return <div>Failed to load widget</div>;
  }
}
