import {
  MonacoComponentsProvider,
  ReactCompilerPlayground as Playground,
  type MonacoComponents,
} from '@mkee/react-compiler-playground';
import '@mkee/react-compiler-playground/styles.css';
import * as React from 'react';

const MonacoEditor = React.lazy(() =>
  import('./monaco-editor').then((m) => ({ default: m.MonacoEditor }))
);

const MonacoDiffEditor = React.lazy(() =>
  import('./monaco-diff-editor').then((m) => ({
    default: m.MonacoDiffEditor,
  }))
);

export type ReactCompilerPlaygroundProps = React.ComponentProps<typeof Playground>;

const monacoComponents = {
  // The playground and the v2 app resolve to different `monaco-editor` versions
  // through pnpm, so the structurally-identical `EditorProps` types are not
  // assignable across the package boundary. The runtime contract is satisfied
  // by `MonacoEditor`, so cast through `unknown` here.
  MonacoEditor,
  MonacoDiffEditor,
} as unknown as MonacoComponents;

/**
 * Wraps the upstream `ReactCompilerPlayground` so that the editors inside it
 * use the site-wide `MonacoEditor` (which already applies the GitHub /
 * Night Owl themes via `useThemeValue`).
 *
 * The Playground itself is wrapped in `<Activity>` so React can pre-render
 * the heavy Monaco subtree at low priority while the wrapper is still off
 * screen, then flip to `visible` once an `IntersectionObserver` (with a
 * generous `rootMargin`) reports we're approaching the viewport.
 */
export function ReactCompilerPlayground(props: ReactCompilerPlaygroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={
        props.height
          ? {
              height: props.height,
            }
          : undefined
      }
    >
      <MonacoComponentsProvider components={monacoComponents}>
        <React.Activity mode={isNear ? 'visible' : 'hidden'}>
          <Playground {...props} />
        </React.Activity>
      </MonacoComponentsProvider>
    </div>
  );
}
