import type { Monaco } from '@monaco-editor/react';
import { CompilerErrorDetail, CompilerDiagnostic } from 'babel-plugin-react-compiler';
import invariant from 'invariant';
import type { editor } from 'monaco-editor';
import { useEffect, useState, JSX } from 'react';
import { ViewTransition } from '../../lib/viewTransitionCompat';
import { renderReactCompilerMarkers } from '../../lib/reactCompilerMonacoDiagnostics';
import { useMonacoComponents } from '../MonacoComponentsContext';
import { useStore, useStoreDispatch } from '../StoreContext';
import TabbedWindow from '../TabbedWindow';
import { monacoOptions } from './monacoOptions';
import { CONFIG_PANEL_TRANSITION } from '../../lib/transitionTypes';

// @ts-expect-error Resolved by tsdown raw-dts plugin
import React$Types from '@types/react/index.d.ts';

type Props = {
  errors: Array<CompilerErrorDetail | CompilerDiagnostic>;
};

export function Input({ errors }: Props): JSX.Element {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const store = useStore();
  const dispatchStore = useStoreDispatch();
  const { MonacoEditor } = useMonacoComponents();

  // Set tab width to 2 spaces for the selected input file.
  useEffect(() => {
    if (!monaco) return;
    const uri = monaco.Uri.parse(`file:///index.tsx`);
    const model = monaco.editor.getModel(uri);
    invariant(model, 'Model must exist for the selected input file.');
    renderReactCompilerMarkers({
      monaco,
      model,
      details: errors,
      source: store.source,
    });
  }, [monaco, errors, store.source]);

  useEffect(() => {
    /**
     * Ignore "can only be used in TypeScript files." errors
     */
    if (!monaco) return;
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [8002, 8003, 8004, 8005, 8006, 8008, 8009, 8010, 8011, 8012, 8013],
      noSemanticValidation: true,
    });
  }, [monaco]);

  const handleChange: (value: string | undefined) => void = async (value) => {
    if (!value) return;

    dispatchStore({
      type: 'updateSource',
      payload: {
        source: value,
      },
    });
  };

  const handleMount: (_: editor.IStandaloneCodeEditor, monaco: Monaco) => void = (_, monaco) => {
    if (typeof window !== 'undefined') {
      // @ts-expect-error
      window['__MONACO_LOADED__'] = true;
    }
    setMonaco(monaco);

    const tscOptions = {
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      typeRoots: ['node_modules/@types'],
      allowSyntheticDefaultImports: true,
    };
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions(tscOptions);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      ...tscOptions,
      checkJs: true,
      allowJs: true,
    });

    // Add React type declarations to Monaco
    if (typeof React$Types === 'string') {
      const reactLib = [React$Types, 'file:///node_modules/@types/react/index.d.ts'] as [
        any,
        string,
      ];
      monaco.languages.typescript.javascriptDefaults.addExtraLib(...reactLib);
      monaco.languages.typescript.typescriptDefaults.addExtraLib(...reactLib);
    }

    /**
     * Remeasure the font in case the custom font is loaded only after
     * Monaco Editor is mounted.
     */
    document.fonts.ready.then(() => {
      monaco.editor.remeasureFonts();
    });
  };

  const editorContent = (
    <MonacoEditor
      path="index.tsx"
      language="typescript"
      value={store.source}
      onMount={handleMount}
      onChange={handleChange}
      className="monaco-editor-input"
      options={monacoOptions}
      loading={''}
    />
  );

  const tabs = new Map([['Input', editorContent]]);
  const [activeTab, setActiveTab] = useState('Input');

  return (
    <ViewTransition
      update={{
        [CONFIG_PANEL_TRANSITION]: 'container',
        default: 'none',
      }}
    >
      <div className="flex-1 min-w-[550px] sm:min-w-0">
        <div className="flex flex-col !h-[calc(var(--rcp-height)_-_var(--rcp-header-height))] border-r border-gray-200">
          <TabbedWindow tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </ViewTransition>
  );
}
