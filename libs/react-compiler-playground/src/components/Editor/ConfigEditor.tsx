import { type Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import React, { useState, useRef, startTransition } from 'react';
import { ViewTransition, addTransitionType } from '../../lib/viewTransitionCompat';
import { Resizable } from 're-resizable';
import { useMonacoComponents } from '../MonacoComponentsContext';
import { useStore, useStoreDispatch } from '../StoreContext';
import { monacoConfigOptions } from './monacoOptions';
import { IconChevron } from '../Icons/IconChevron';
import { CONFIG_PANEL_TRANSITION } from '../../lib/transitionTypes';

export function ConfigEditor({
  formattedAppliedConfig,
}: {
  formattedAppliedConfig: string;
}): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        style={{
          display: isExpanded ? 'block' : 'none',
        }}
      >
        <ExpandedEditor
          onToggle={() => {
            startTransition(() => {
              addTransitionType(CONFIG_PANEL_TRANSITION);
              setIsExpanded(false);
            });
          }}
          formattedAppliedConfig={formattedAppliedConfig}
        />
      </div>
      <div
        style={{
          display: !isExpanded ? 'block' : 'none',
        }}
      >
        <CollapsedEditor
          onToggle={() => {
            startTransition(() => {
              addTransitionType(CONFIG_PANEL_TRANSITION);
              setIsExpanded(true);
            });
          }}
        />
      </div>
    </>
  );
}

function ExpandedEditor({
  onToggle,
  formattedAppliedConfig,
}: {
  onToggle: () => void;
  formattedAppliedConfig: string;
}): React.ReactElement {
  const store = useStore();
  const dispatchStore = useStoreDispatch();
  const { MonacoEditor } = useMonacoComponents();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange: (value: string | undefined) => void = (value: string | undefined) => {
    if (value === undefined) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      dispatchStore({
        type: 'updateConfig',
        payload: {
          config: value,
        },
      });
    }, 500);
  };

  const handleMount: (_: editor.IStandaloneCodeEditor, monaco: Monaco) => void = (_, monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: true,
      trailingCommas: 'ignore',
    });
  };

  return (
    <ViewTransition update={{ [CONFIG_PANEL_TRANSITION]: 'slide-in', default: 'none' }}>
      <Resizable
        minWidth={300}
        maxWidth={600}
        defaultSize={{ width: 350 }}
        enable={{ right: true, bottom: false }}
      >
        <div className="bg-sky-50 relative flex flex-col !h-[calc(var(--rcp-height)_-_var(--rcp-header-height))] border border-gray-300">
          <div
            className="absolute w-8 h-16 bg-sky-50 rounded-r-full flex items-center justify-center z-[2] cursor-pointer border border-l-0 border-gray-300"
            title="Minimize config editor"
            onClick={onToggle}
            style={{
              top: '50%',
              marginTop: '-32px',
              right: '-32px',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <IconChevron displayDirection="left" className="text-sky-700" />
          </div>

          <div className="flex-1 flex flex-col m-2 mb-2">
            <div className="pb-2">
              <h2 className="inline-block text-sky-700 py-1.5 px-1.5 xs:px-3 sm:px-4 text-sm">
                Config Overrides
              </h2>
            </div>
            <div className="flex-1 border border-gray-300">
              <MonacoEditor
                path={'config.json5'}
                language={'json'}
                value={store.config}
                onMount={handleMount}
                onChange={handleChange}
                loading={''}
                className="monaco-editor-config"
                options={monacoConfigOptions}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col m-2">
            <div className="pb-2">
              <h2 className="inline-block text-sky-700 py-1.5 px-1.5 xs:px-3 sm:px-4 text-sm">
                Applied Configs
              </h2>
            </div>
            <div className="flex-1 border border-gray-300">
              <MonacoEditor
                path={'applied-config.js'}
                language={'javascript'}
                value={formattedAppliedConfig}
                loading={''}
                className="monaco-editor-applied-config"
                options={{
                  ...monacoConfigOptions,
                  readOnly: true,
                }}
              />
            </div>
          </div>
        </div>
      </Resizable>
    </ViewTransition>
  );
}

function CollapsedEditor({ onToggle }: { onToggle: () => void }): React.ReactElement {
  return (
    <div
      className="w-4 !h-[calc(var(--rcp-height)_-_var(--rcp-header-height))]"
      style={{ position: 'relative' }}
    >
      <div
        className="absolute w-10 h-16 bg-sky-50 hover:translate-x-2 transition-transform rounded-r-full flex items-center justify-center z-[2] cursor-pointer border border-gray-300"
        title="Expand config editor"
        onClick={onToggle}
        style={{
          top: '50%',
          marginTop: '-32px',
          left: '-8px',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <IconChevron displayDirection="right" className="text-sky-700" />
      </div>
    </div>
  );
}
