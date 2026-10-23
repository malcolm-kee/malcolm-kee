import { foldKeymap } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import {
  CodeEditor,
  FileTabs,
  SandpackCodeEditor,
  SandpackStack,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react';
import * as React from 'react';
import type { SupportedLang } from './code-sandbox-helpers';
import { SandboxCodeViewer } from './sandbox-code-viewer';
import { createCssFolding } from './sandbox-css-folding';

const MonacoEditor = React.lazy(() => import('./sandbox-monaco-editor'));
const foldingKeymap = [...foldKeymap];
const readOnlyExtensions = [EditorState.readOnly.of(true), EditorView.editable.of(false)];

interface SandboxEditorProps {
  lang: SupportedLang;
  theme: 'light' | 'dark';
  showTabs: boolean;
  style: React.CSSProperties;
  readOnly?: boolean;
  highlightedLines: Record<string, Array<number>>;
  defaultCollapsedRegions?: readonly string[];
}

export function SandboxEditor({
  lang,
  theme,
  defaultCollapsedRegions,
  ...props
}: SandboxEditorProps) {
  const { sandpack } = useSandpack();
  const cssFolding = React.useMemo(
    () => createCssFolding(defaultCollapsedRegions),
    [defaultCollapsedRegions]
  );

  // CSS tabs share the same editor and folding behavior, including in TS sandboxes.
  if (sandpack.activeFile.endsWith('.css')) {
    return <CssEditor {...props} cssFolding={cssFolding} />;
  }

  if (props.readOnly) {
    return (
      <SandboxCodeViewer showTabs={props.showTabs} highlightedLines={props.highlightedLines} />
    );
  }

  return lang === 'ts' ? (
    <MonacoEditor lang={lang} theme={theme} showTabs={props.showTabs} style={props.style} />
  ) : (
    <SandpackCodeEditor style={props.style} showTabs={props.showTabs} />
  );
}

function CssEditor({
  cssFolding,
  readOnly,
  highlightedLines,
  showTabs,
  style,
}: Pick<SandboxEditorProps, 'readOnly' | 'highlightedLines' | 'showTabs' | 'style'> & {
  cssFolding: ReturnType<typeof createCssFolding>;
}) {
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();
  const { activeFile } = sandpack;
  const editorId = React.useId();
  const extensions = React.useMemo(
    () => [...cssFolding(activeFile), ...(readOnly ? readOnlyExtensions : [])],
    [activeFile, cssFolding, readOnly]
  );
  const decorators = React.useMemo(
    () =>
      readOnly
        ? highlightedLines[activeFile]?.map((line) => ({ line: line + 1, className: 'highlight' }))
        : undefined,
    [activeFile, highlightedLines, readOnly]
  );

  return (
    <SandpackStack className={readOnly ? 'sp-editor-viewer' : 'sp-editor'} style={style}>
      {showTabs && <FileTabs activeFileUniqueId={editorId} />}
      <div
        className="sp-code-editor relative flex-1 overflow-auto"
        role="tabpanel"
        id={`${activeFile}-${editorId}-tab-panel`}
        aria-labelledby={showTabs ? `${activeFile}-${editorId}-tab` : undefined}
      >
        <CodeEditor
          key={activeFile}
          code={code}
          filePath={activeFile}
          initMode={sandpack.initMode}
          editorState={sandpack.editorState}
          extensions={extensions}
          extensionsKeymap={foldingKeymap}
          decorators={decorators}
          // Sandpack's readOnly prop can render static HTML. Enforce it through
          // extensions instead, so readers can still interact with fold controls.
          onCodeUpdate={readOnly ? undefined : (value) => updateCode(value, sandpack.autoReload)}
        />
      </div>
    </SandpackStack>
  );
}
