import type { Dispatch, ReactNode } from 'react';
import { useState, useEffect, type JSX, useId, useMemo, useReducer } from 'react';
import createContext from '../lib/createContext';
import { emptyStore, defaultStore } from '../lib/defaultStore';
import { saveStore, initStoreFromUrlOrLocalStorage, type Store } from '../lib/stores';

const StoreContext = createContext<Store>();

/**
 * Hook to access the store.
 */
export const useStore = StoreContext.useContext;

const StoreDispatchContext = createContext<Dispatch<ReducerAction>>();

/**
 * Hook to access the store dispatch function.
 */
export const useStoreDispatch = StoreDispatchContext.useContext;

type EditorPaths = {
  /** Monaco model path for the input editor (unique per playground instance). */
  inputPath: string;
  /** Monaco model path for the output editor (unique per playground instance). */
  outputPath: string;
};

const EditorPathsContext = createContext<EditorPaths>();

/**
 * Hook to access the per-instance Monaco editor paths. Each playground instance
 * needs its own paths because Monaco models are global singletons keyed by URI;
 * sharing a path causes multiple playgrounds on one page to bind to the same
 * underlying model.
 */
export const useEditorPaths = EditorPathsContext.useContext;

/**
 * Make Store and dispatch function available to all sub-components in children.
 */
export function StoreProvider({
  children,
  persistState,
  defaultSource,
}: {
  children: ReactNode;
  persistState?: boolean;
  defaultSource?: string;
}): JSX.Element {
  const [store, dispatch] = useReducer(storeReducer, emptyStore);
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const instanceId = useId();
  const editorPaths = useMemo<EditorPaths>(
    () => ({
      // Monaco URIs cannot contain `:` (used as the scheme separator), and React's
      // `useId` returns ids like `:r0:`. Strip the colons so the resulting URI is
      // valid (`file:///<id>/index.tsx`).
      inputPath: `${instanceId.replace(/:/g, '')}/index.tsx`,
      outputPath: `${instanceId.replace(/:/g, '')}/index.jsx`,
    }),
    [instanceId]
  );

  useEffect(() => {
    let mountStore: Store | undefined = undefined;
    if (persistState) {
      try {
        mountStore = initStoreFromUrlOrLocalStorage();
      } catch (e) {
        console.error('Failed to initialize store from URL or local storage', e);
      }
    }

    if (mountStore == null) {
      mountStore = defaultSource
        ? {
            ...defaultStore,
            source: defaultSource,
          }
        : defaultStore;
    }

    dispatch({ type: 'setStore', payload: { store: mountStore } });
    setIsPageReady(true);
  }, []);

  useEffect(() => {
    if (store !== emptyStore && persistState) {
      saveStore(store);
    }
  }, [store, persistState]);

  return (
    <StoreContext.Provider value={store}>
      <StoreDispatchContext.Provider value={dispatch}>
        <EditorPathsContext.Provider value={editorPaths}>
          {isPageReady ? children : null}
        </EditorPathsContext.Provider>
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
}

type ReducerAction =
  | {
      type: 'setStore';
      payload: {
        store: Store;
      };
    }
  | {
      type: 'updateSource';
      payload: {
        source: string;
      };
    }
  | {
      type: 'updateConfig';
      payload: {
        config: string;
      };
    }
  | {
      type: 'toggleInternals';
    };

function storeReducer(store: Store, action: ReducerAction): Store {
  switch (action.type) {
    case 'setStore': {
      const newStore = action.payload.store;
      return newStore;
    }
    case 'updateSource': {
      const source = action.payload.source;
      const newStore = {
        ...store,
        source,
      };
      return newStore;
    }
    case 'updateConfig': {
      const config = action.payload.config;
      const newStore = {
        ...store,
        config,
      };
      return newStore;
    }
    case 'toggleInternals': {
      const newStore = {
        ...store,
        showInternals: !store.showInternals,
      };
      return newStore;
    }
  }
}
