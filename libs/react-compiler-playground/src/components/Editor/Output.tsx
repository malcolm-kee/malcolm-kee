import type { Monaco } from '@monaco-editor/react';
import { BabelFileResult } from '@babel/core';
import {
  CompilerDiagnostic,
  CompilerErrorDetail,
  type CompilerError,
} from 'babel-plugin-react-compiler';
import { LRUCache } from 'lru-cache';
import * as prettier from 'prettier/standalone';
import { JSX, ReactNode, Suspense, memo, startTransition, use, useState } from 'react';
import { formatCode } from '../../lib/formatCode';
import { rewriteCompilerOutput } from '../../lib/rewriteCompilerOutput';
import { type Store } from '../../lib/stores';
import {
  CONFIG_PANEL_TRANSITION,
  EXPAND_ACCORDION_TRANSITION,
  TOGGLE_INTERNALS_TRANSITION,
} from '../../lib/transitionTypes';
import { ViewTransition, addTransitionType } from '../../lib/viewTransitionCompat';
import AccordionWindow from '../AccordionWindow';
import { CodeIcon, DocumentAddIcon, InformationCircleIcon } from '../Icons/HeroIcons';
import { useMonacoComponents } from '../MonacoComponentsContext';
import { useEditorPaths } from '../StoreContext';
import TabbedWindow from '../TabbedWindow';
import { monacoOptions } from './monacoOptions';

const MemoizedOutput = memo(Output);

export default MemoizedOutput;

export const BASIC_OUTPUT_TAB_NAMES = ['Output', 'Output (Pretty)', 'SourceMap'] as const;

const tabifyCache = new LRUCache<Store, Promise<Map<string, ReactNode>>>({
  max: 5,
});

export type PrintedCompilerPipelineValue =
  | {
      kind: 'hir';
      name: string;
      fnName: string | null;
      value: string;
    }
  | { kind: 'reactive'; name: string; fnName: string | null; value: string }
  | { kind: 'debug'; name: string; fnName: string | null; value: string };

export type CompilerTransformOutput = {
  code: string;
  sourceMaps: BabelFileResult['map'];
};
export type CompilerOutput =
  | {
      kind: 'ok';
      transformOutput: CompilerTransformOutput;
      results: Map<string, Array<PrintedCompilerPipelineValue>>;
      errors: Array<CompilerErrorDetail | CompilerDiagnostic>;
    }
  | {
      kind: 'err';
      results: Map<string, Array<PrintedCompilerPipelineValue>>;
      error: CompilerError;
    };

type Props = {
  store: Store;
  compilerOutput: CompilerOutput;
  defaultTab?: string;
};

async function tabify(
  source: string,
  compilerOutput: CompilerOutput,
  showInternals: boolean
): Promise<Map<string, ReactNode>> {
  const tabs = new Map<string, React.ReactNode>();
  const reorderedTabs = new Map<string, React.ReactNode>();
  const concattedResults = new Map<string, string>();
  // Concat all top level function declaration results into a single tab for each pass
  for (const [passName, results] of compilerOutput.results) {
    // @ts-expect-error
    if (!showInternals && !BASIC_OUTPUT_TAB_NAMES.includes(passName)) {
      continue;
    }
    for (const result of results) {
      switch (result.kind) {
        case 'hir': {
          const prev = concattedResults.get(result.name);
          const next = result.value;
          const identName = `function ${result.fnName}`;
          if (prev != null) {
            concattedResults.set(passName, `${prev}\n\n${identName}\n${next}`);
          } else {
            concattedResults.set(passName, `${identName}\n${next}`);
          }
          break;
        }
        case 'reactive': {
          const prev = concattedResults.get(passName);
          const next = result.value;
          if (prev != null) {
            concattedResults.set(passName, `${prev}\n\n${next}`);
          } else {
            concattedResults.set(passName, next);
          }
          break;
        }
        case 'debug': {
          concattedResults.set(passName, result.value);
          break;
        }
        default: {
          const _: never = result;
          throw new Error('Unexpected result kind');
        }
      }
    }
  }
  let lastPassOutput: string | null = null;
  let nonDiffPasses = ['HIR', 'BuildReactiveFunction', 'EnvironmentConfig'];
  for (const [passName, text] of concattedResults) {
    tabs.set(
      passName,
      <TextTabContent
        output={text}
        diff={lastPassOutput}
        showInfoPanel={!nonDiffPasses.includes(passName)}
      ></TextTabContent>
    );
    lastPassOutput = text;
  }
  // Ensure that JS and the JS source map come first
  if (compilerOutput.kind === 'ok') {
    const { transformOutput } = compilerOutput;
    const sourceMapUrl = getSourceMapUrl(
      transformOutput.code,
      JSON.stringify(transformOutput.sourceMaps)
    );
    const prettyCode = await formatCode(transformOutput.code, prettier);
    const rewrittenCode = await formatCode(rewriteCompilerOutput(transformOutput.code), prettier);

    let output: string;
    let prettyOutput: string;
    let language: string;
    if (compilerOutput.errors.length === 0) {
      output = prettyCode;
      prettyOutput = rewrittenCode;
      language = 'javascript';
    } else {
      language = 'markdown';
      const errorHeader = `
# Summary

React Compiler compiled this function successfully, but there are lint errors that indicate potential issues with the original code.

## ${compilerOutput.errors.length} Lint Errors

${compilerOutput.errors.map((e) => e.printErrorMessage(source, { eslint: false })).join('\n\n')}

## Output
`.trim();
      output = `${errorHeader}\n\n\`\`\`js\n${prettyCode}\n\`\`\``;
      prettyOutput = `${errorHeader}\n\n\`\`\`js\n${rewrittenCode}\n\`\`\``;
    }

    reorderedTabs.set(
      'Output',
      <TextTabContent
        output={output}
        language={language}
        diff={null}
        showInfoPanel={false}
      ></TextTabContent>
    );
    reorderedTabs.set(
      'Output (Pretty)',
      <TextTabContent
        output={prettyOutput}
        language={language}
        diff={null}
        showInfoPanel={false}
      ></TextTabContent>
    );
    if (sourceMapUrl) {
      reorderedTabs.set(
        'SourceMap',
        <>
          <iframe
            src={sourceMapUrl}
            className="w-full h-monaco_small sm:h-monaco"
            title="Generated Code"
          />
        </>
      );
    }
  } else if (compilerOutput.kind === 'err') {
    const errors = compilerOutput.error.printErrorMessage(source, {
      eslint: false,
    });
    reorderedTabs.set(
      'Output',
      <TextTabContent
        output={errors}
        language="markdown"
        diff={null}
        showInfoPanel={false}
      ></TextTabContent>
    );
  }
  tabs.forEach((tab, name) => {
    reorderedTabs.set(name, tab);
  });
  return reorderedTabs;
}

function tabifyCached(
  store: Store,
  compilerOutput: CompilerOutput
): Promise<Map<string, ReactNode>> {
  const cached = tabifyCache.get(store);
  if (cached) return cached;
  const result = tabify(store.source, compilerOutput, store.showInternals);
  tabifyCache.set(store, result);
  return result;
}

function Fallback(): JSX.Element {
  return (
    <div className="w-full h-monaco_small sm:h-monaco flex items-center justify-center">
      Loading...
    </div>
  );
}

function utf16ToUTF8(s: string): string {
  return unescape(encodeURIComponent(s));
}

function getSourceMapUrl(code: string, map: string): string | null {
  code = utf16ToUTF8(code);
  map = utf16ToUTF8(map);
  return `https://evanw.github.io/source-map-visualization/#${btoa(
    `${code.length}\0${code}${map.length}\0${map}`
  )}`;
}

function Output(props: Props): JSX.Element {
  return (
    <Suspense fallback={<Fallback />}>
      <OutputContent {...props} />
    </Suspense>
  );
}

function OutputContent({ store, compilerOutput, defaultTab }: Props): JSX.Element {
  const [tabsOpen, setTabsOpen] = useState<Set<string>>(() => new Set(['Output']));
  const [activeTab, setActiveTab] = useState<string>(() =>
    // @ts-expect-error
    defaultTab && BASIC_OUTPUT_TAB_NAMES.includes(defaultTab) ? defaultTab : 'Output'
  );

  const [previousOutputKind, setPreviousOutputKind] = useState(compilerOutput.kind);
  const isFailure = compilerOutput.kind !== 'ok';

  if (compilerOutput.kind !== previousOutputKind) {
    setPreviousOutputKind(compilerOutput.kind);
    if (isFailure) {
      startTransition(() => {
        addTransitionType(EXPAND_ACCORDION_TRANSITION);
        setTabsOpen((prev) => new Set(prev).add('Output'));
        setActiveTab('Output');
      });
    }
  }

  const changedPasses: Set<string> = new Set(['Output', 'HIR']);
  let lastResult: string = '';
  for (const [passName, results] of compilerOutput.results) {
    for (const result of results) {
      let currResult = '';
      if (result.kind === 'hir' || result.kind === 'reactive') {
        currResult += `function ${result.fnName}\n\n${result.value}`;
      }
      if (currResult !== lastResult) {
        changedPasses.add(passName);
      }
      lastResult = currResult;
    }
  }
  const tabs = use(tabifyCached(store, compilerOutput));

  if (!store.showInternals) {
    return (
      <ViewTransition
        update={{
          [CONFIG_PANEL_TRANSITION]: 'container',
          [TOGGLE_INTERNALS_TRANSITION]: '',
          default: 'none',
        }}
      >
        <TabbedWindow tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </ViewTransition>
    );
  }

  return (
    <ViewTransition
      update={{
        [CONFIG_PANEL_TRANSITION]: 'accordion-container',
        [TOGGLE_INTERNALS_TRANSITION]: '',
        default: 'none',
      }}
    >
      <AccordionWindow
        defaultTab={store.showInternals ? 'HIR' : 'Output'}
        setTabsOpen={setTabsOpen}
        tabsOpen={tabsOpen}
        tabs={tabs}
        changedPasses={changedPasses}
      />
    </ViewTransition>
  );
}

function TextTabContent({
  output,
  diff,
  showInfoPanel,
  language,
}: {
  output: string;
  diff: string | null;
  showInfoPanel: boolean;
  language?: string;
}): JSX.Element {
  const [diffMode, setDiffMode] = useState(false);
  const { MonacoEditor, MonacoDiffEditor } = useMonacoComponents();
  const { outputPath } = useEditorPaths();
  return (
    <div className="w-full h-monaco_small sm:h-monaco">
      {showInfoPanel ? (
        <div className="flex items-center gap-1 bg-amber-50 p-2">
          {diff != null && output !== diff ? (
            <button
              className="flex items-center gap-1 transition-colors duration-150 ease-in text-gray-600 hover:text-sky-700"
              onClick={() => setDiffMode((diffMode) => !diffMode)}
            >
              {!diffMode ? (
                <>
                  <DocumentAddIcon className="w-5 h-5" /> Show Diff
                </>
              ) : (
                <>
                  <CodeIcon className="w-5 h-5" /> Show Output
                </>
              )}
            </button>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <InformationCircleIcon className="w-5 h-5" /> No changes from previous pass
              </span>
            </>
          )}
        </div>
      ) : null}
      {diff != null && diffMode ? (
        <MonacoDiffEditor
          original={diff}
          modified={output}
          loading={''}
          options={{
            ...monacoOptions,
            scrollbar: {
              vertical: 'hidden',
            },
            dimension: {
              width: 0,
              height: 0,
            },
            readOnly: true,
            lineNumbers: 'off',
            glyphMargin: false,
            overviewRulerLanes: 0,
          }}
        />
      ) : (
        <MonacoEditor
          language={language ?? 'javascript'}
          path={outputPath}
          value={output}
          loading={''}
          className="monaco-editor-output"
          onMount={handleMount}
          options={{
            ...monacoOptions,
            readOnly: true,
            lineNumbers: 'off',
            glyphMargin: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
          }}
        />
      )}
    </div>
  );
}

// @ts-expect-error Resolved by tsdown raw-dts plugin
import React$Types from '@types/react/index.d.ts';

const handleMount = (_: unknown, monaco: Monaco) => {
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
    const reactLib = [React$Types, 'file:///node_modules/@types/react/index.d.ts'] as [any, string];
    const runTimeLib: [string, string] = [
      `
/** useMemoCache returns slots for cache keys and cached values */
export const c: (slotSize: number) => Array<any>;`,
      'file:///node_modules/@types/react/compiler-runtime/index.d.ts',
    ];

    [reactLib, runTimeLib].forEach((lib) => {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(...lib);
      monaco.languages.typescript.typescriptDefaults.addExtraLib(...lib);
    });
  }
};
