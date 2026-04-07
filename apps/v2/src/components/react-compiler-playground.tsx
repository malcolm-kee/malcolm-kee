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

type PlaygroundProps = React.ComponentProps<typeof Playground>;

const monacoComponents: Partial<MonacoComponents> = {
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
 */
export function ReactCompilerPlayground(props: PlaygroundProps) {
  return (
    <MonacoComponentsProvider components={monacoComponents}>
      <Playground {...props} />
    </MonacoComponentsProvider>
  );
}
