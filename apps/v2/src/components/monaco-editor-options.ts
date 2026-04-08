import type { EditorProps } from '@monaco-editor/react';

export type EditorOptions = EditorProps['options'];

export const editorOptions = {
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

  fixedOverflowWidgets: true,

  tabSize: 2,
} satisfies EditorOptions;
