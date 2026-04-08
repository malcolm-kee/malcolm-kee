import { clsx } from 'clsx';
import { useSnackbar } from 'notistack';
import { JSX, startTransition } from 'react';
import { defaultStore } from '../lib/defaultStore';
import { TOGGLE_INTERNALS_TRANSITION } from '../lib/transitionTypes';
import { addTransitionType } from '../lib/viewTransitionCompat';
import { RefreshIcon } from './Icons/HeroIcons';
import { useStore, useStoreDispatch } from './StoreContext';

export function Header(): JSX.Element {
  const store = useStore();
  const dispatchStore = useStoreDispatch();
  const { closeSnackbar } = useSnackbar();

  const handleReset: () => void = () => {
    if (confirm('Are you sure you want to reset the playground?')) {
      closeSnackbar();
      dispatchStore({ type: 'setStore', payload: { store: defaultStore } });
    }
  };

  return (
    <div className="fixed z-10 flex items-center justify-between w-screen px-5 py-3 bg-white border-b border-gray-200 h-14">
      <div className="flex items-center flex-none h-full gap-2 text-lg">
        <p className="hidden select-none sm:block">React Compiler Playground</p>
      </div>
      <div className="flex items-center text-[15px] gap-4">
        <div className="flex items-center gap-2">
          <label className="show-internals relative inline-block w-[34px] h-5">
            <input
              type="checkbox"
              checked={store.showInternals}
              onChange={() =>
                startTransition(() => {
                  addTransitionType(TOGGLE_INTERNALS_TRANSITION);
                  dispatchStore({ type: 'toggleInternals' });
                })
              }
              className="absolute opacity-0 cursor-pointer h-full w-full m-0"
            />
            <span
              className={clsx(
                'absolute inset-0 rounded-full cursor-pointer transition-all duration-250',
                "before:content-[''] before:absolute before:w-4 before:h-4 before:left-0.5 before:bottom-0.5",
                'before:bg-white before:rounded-full before:transition-transform before:duration-250',
                'focus-within:shadow-[0_0_1px_#2196F3]',
                store.showInternals ? 'bg-sky-700 before:translate-x-3.5' : 'bg-gray-300'
              )}
            ></span>
          </label>
          <span className="text-gray-600">Show Internals</span>
        </div>
        <button
          title="Reset Playground"
          aria-label="Reset Playground"
          className="flex items-center gap-1 transition-colors duration-150 ease-in text-gray-600 hover:text-sky-700"
          onClick={handleReset}
        >
          <RefreshIcon className="w-5 h-5" />
          <p className="hidden sm:block">Reset</p>
        </button>
      </div>
    </div>
  );
}
