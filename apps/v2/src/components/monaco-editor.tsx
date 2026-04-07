import Editor from '@monaco-editor/react';
import * as React from 'react';
import githubTheme from './monaco-themes/github-light.json';
import nightOwlTheme from './monaco-themes/night-owl.json';

export function MonacoEditor({
  theme,
  options,
  beforeMount,
  ...props
}: React.ComponentProps<typeof Editor> & {
  theme?: 'light' | 'dark';
}) {
  const memoizedOptions = React.useMemo(
    () =>
      options
        ? {
            ...editorOptions,
            options,
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

export type EditorOptions = React.ComponentPropsWithoutRef<typeof Editor>['options'];

const editorOptions = {
  fontSize: 14,
  lineHeight: 24,
  scrollbar: {
    verticalScrollbarSize: 10,
    alwaysConsumeMouseWheel: false,
  },
  minimap: {
    enabled: false,
  },
  glyphMargin: true,
  formatOnPaste: true,
  formatOnType: true,

  autoClosingBrackets: 'languageDefined',
  autoClosingDelete: 'always',
  autoClosingOvertype: 'always',

  automaticLayout: true,
  wordWrap: 'on',
  wrappingIndent: 'same',

  tabSize: 2,
} satisfies EditorOptions;
