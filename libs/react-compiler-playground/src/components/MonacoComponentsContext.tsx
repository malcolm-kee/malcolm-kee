import MonacoEditorDefault, { DiffEditor as MonacoDiffEditorDefault } from '@monaco-editor/react';
import * as React from 'react';

/**
 * The shape of the Monaco-related components consumed by the playground.
 *
 * Both fields accept any component whose props are assignable to the
 * corresponding `@monaco-editor/react` exports, so consumers can pass thin
 * wrappers (e.g. wrappers that apply a custom theme) without having to
 * reimplement the underlying editor.
 */
export type MonacoComponents = {
  MonacoEditor: React.ComponentType<React.ComponentProps<typeof MonacoEditorDefault>>;
  MonacoDiffEditor: React.ComponentType<React.ComponentProps<typeof MonacoDiffEditorDefault>>;
};

const defaultMonacoComponents: MonacoComponents = {
  MonacoEditor: MonacoEditorDefault,
  MonacoDiffEditor: MonacoDiffEditorDefault,
};

const MonacoComponentsContext = React.createContext<MonacoComponents>(defaultMonacoComponents);

/**
 * Hook used internally by the playground to retrieve the Monaco-based
 * components. Falls back to the default `@monaco-editor/react` exports when no
 * provider is present.
 */
export function useMonacoComponents(): MonacoComponents {
  return React.useContext(MonacoComponentsContext);
}

/**
 * Allows callers to inject custom Monaco editor components used by the
 * playground. This is useful when the host application already wraps Monaco
 * (for example, to apply a shared theme) and wants the playground to render
 * editors with that same wrapper.
 *
 * Any component that is not provided falls back to the default
 * `@monaco-editor/react` exports.
 */
export function MonacoComponentsProvider({
  components,
  children,
}: {
  components?: Partial<MonacoComponents>;
  children: React.ReactNode;
}): React.JSX.Element {
  const value = React.useMemo<MonacoComponents>(
    () => ({
      MonacoEditor: components?.MonacoEditor ?? defaultMonacoComponents.MonacoEditor,
      MonacoDiffEditor: components?.MonacoDiffEditor ?? defaultMonacoComponents.MonacoDiffEditor,
    }),
    [components?.MonacoEditor, components?.MonacoDiffEditor]
  );

  return (
    <MonacoComponentsContext.Provider value={value}>{children}</MonacoComponentsContext.Provider>
  );
}
