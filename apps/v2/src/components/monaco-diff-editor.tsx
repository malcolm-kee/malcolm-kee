import { useThemeValue } from '@app/hooks/use-theme';
import { DiffEditor, type DiffEditorProps } from '@monaco-editor/react';
import * as React from 'react';
import githubTheme from './monaco-themes/github-light.json';
import nightOwlTheme from './monaco-themes/night-owl.json';
import { editorOptions } from './monaco-editor-options';

export function MonacoDiffEditor({ options, beforeMount, ...props }: DiffEditorProps) {
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
    <DiffEditor
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
