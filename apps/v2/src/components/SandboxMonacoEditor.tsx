import {
  FileTabs,
  SandpackStack,
  SandpackCodeEditor,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import nightOwlTheme from 'monaco-themes/themes/Night Owl.json';
import githubTheme from 'monaco-themes/themes/GitHub Light.json';
import * as React from 'react';

/**
 * MonacoEditor that do not support jsx/tsx currently.
 */
function MonacoEditor({
  lang,
  theme,
  showTabs,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  lang: keyof typeof langMap;
  theme: 'light' | 'dark';
  showTabs?: boolean;
}) {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  return (
    <SandpackStack {...props}>
      {showTabs && <FileTabs />}
      {/* render SandpackCodeEditor in mobile because Monaco editor is not mobile friendly */}
      <div className="flex-1 sm:hidden">
        <SandpackCodeEditor style={props.style} />
      </div>
      <div className="hidden sm:block sm:flex-1">
        <Editor
          width="100%"
          height="100%"
          language={langMap[lang]}
          theme={theme === 'dark' ? 'nightowl' : 'github'}
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || '')}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('github', githubTheme as any);
            monaco.editor.defineTheme('nightowl', nightOwlTheme as any);
          }}
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
