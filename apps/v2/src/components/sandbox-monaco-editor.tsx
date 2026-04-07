import {
  FileTabs,
  SandpackCodeEditor,
  SandpackStack,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react';
import * as React from 'react';
import { MonacoEditor, type EditorOptions } from './monaco-editor';

/**
 * MonacoEditor that do not support jsx/tsx currently.
 */
function SandboxMonacoEditor({
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
        <MonacoEditor
          width="100%"
          height="100%"
          language={langMap[lang]}
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || '')}
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
  lineNumbers: 'off',
} satisfies EditorOptions;

export default SandboxMonacoEditor;
