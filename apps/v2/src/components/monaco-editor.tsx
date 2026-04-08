import { useThemeValue } from '@app/hooks/use-theme';
import Editor from '@monaco-editor/react';
import * as React from 'react';
import githubTheme from './monaco-themes/github-light.json';
import nightOwlTheme from './monaco-themes/night-owl.json';
import { editorOptions } from './monaco-editor-options';

export function MonacoEditor({
  options,
  beforeMount,
  ...props
}: React.ComponentProps<typeof Editor>) {
  const theme = useThemeValue();

  const memoizedOptions = React.useMemo(
    () =>
      options
        ? {
            ...editorOptions,
            ...options,
          }
        : editorOptions,
    [options]
  );
  return (
    <Editor
      theme={theme === 'dark' ? 'nightowl' : 'github'}
      beforeMount={(monaco) => {
        monaco.editor.defineTheme('github', githubTheme as any);
        monaco.editor.defineTheme('nightowl', nightOwlTheme as any);

        beforeMount?.(monaco);
      }}
      options={memoizedOptions}
      {...props}
    />
  );
}
