import * as React from 'react';
import Editor from '@monaco-editor/react';
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from '@codesandbox/sandpack-react';
import githubTheme from 'monaco-themes/themes/GitHub Light.json';

/**
 * MonacoEditor that do not support jsx/tsx currently.
 */
function MonacoEditor({
  lang,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  lang: keyof typeof langMap;
}) {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  return (
    <SandpackStack {...props}>
      <FileTabs />
      <div style={{ flex: 1 }}>
        <Editor
          width="100%"
          height="100%"
          language={langMap[lang]}
          theme="github"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || '')}
          beforeMount={(monaco) =>
            monaco.editor.defineTheme('github', githubTheme as any)
          }
          options={editorOptions}
        />
      </div>
    </SandpackStack>
  );
}

const langMap = {
  js: 'javascript',
  ts: 'typescript',
};

const editorOptions = {
  fontSize: 14,
  lineHeight: 24,
  minimap: {
    enabled: false,
  },
};

export default MonacoEditor;
