import { clsx } from 'clsx';
import * as React from 'react';
import { createPortal, flushSync } from 'react-dom';
import { viewTransition } from '~/lib/view-transition';
import { CloseIcon } from '../icons';
import styles from './animated-dialog.module.css';

export const AnimatedDialog = () => {
  const [shown, setShown] = React.useState(false);

  const toggle = () => {
    viewTransition(() => {
      flushSync(() => setShown((s) => !s));
    });
  };

  React.useEffect(() => {
    if (shown) {
      const dismissOnEsc = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
          toggle();
        }
      };

      window.addEventListener('keyup', dismissOnEsc);

      return () => window.removeEventListener('keyup', dismissOnEsc);
    }
  }, [shown]);

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={clsx('relative inline-flex items-center px-3 py-1 rounded overflow-hidden')}
      >
        <span className={clsx('absolute inset-0 bg-pink-600', !shown && styles.focus)}></span>
        <span className="relative text-white">Demo</span>
      </button>
      {shown &&
        createPortal(
          <div className="fixed inset-0 z-50 flex justify-center items-center p-6 pb-20">
            <div
              className={clsx('fixed inset-0 bg-slate-900/50 backdrop-blur', styles.backdrop)}
              onClick={toggle}
            />
            <div className={clsx('relative bg-pink-50 rounded-xl shadow', styles.focus)}>
              <div className="flex justify-between items-center gap-5 p-3 border-b border-pink-200">
                <h2 className={clsx('text-lg w-min whitespace-nowrap')}>Cute Stuff</h2>
                <button onClick={toggle} type="button">
                  <CloseIcon className="w-5 h-5 stroke-slate-500" />
                </button>
              </div>
              <div className="p-3">
                <p>
                  Look ma! I animate from the button when appear and move to button when dismissed.
                </p>
                <p>You can close me now.</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
