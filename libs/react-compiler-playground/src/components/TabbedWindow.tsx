import React, { startTransition, useId } from 'react';
import { ViewTransition, addTransitionType } from '../lib/viewTransitionCompat';
import clsx from 'clsx';
import { TOGGLE_TAB_TRANSITION } from '../lib/transitionTypes';

export default function TabbedWindow({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: Map<string, React.ReactNode>;
  activeTab: string;
  onTabChange: (tab: string) => void;
}): React.ReactElement {
  const id = useId();
  const transitionName = `tab-highlight-${id}`;

  const handleTabChange = (tab: string): void => {
    startTransition(() => {
      addTransitionType(TOGGLE_TAB_TRANSITION);
      onTabChange(tab);
    });
  };

  return (
    <div className="flex-1 min-w-[550px] sm:min-w-0">
      <div className="flex flex-col h-full max-w-full">
        <div className="flex p-2 flex-shrink-0">
          {Array.from(tabs.keys()).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={clsx(
                  'transition-transform py-1.5 px-1.5 xs:px-3 sm:px-4 rounded-full text-sm relative',
                  isActive ? 'text-sky-700' : 'hover:bg-gray-100'
                )}
              >
                {isActive && (
                  <ViewTransition
                    name={transitionName}
                    enter={{ default: 'none' }}
                    exit={{ default: 'none' }}
                    share={{
                      [TOGGLE_TAB_TRANSITION]: 'tab-highlight',
                      default: 'none',
                    }}
                    update={{ default: 'none' }}
                  >
                    <div className="absolute inset-0 bg-sky-50 rounded-full" />
                  </ViewTransition>
                )}
                <ViewTransition
                  enter={{ default: 'none' }}
                  exit={{ default: 'none' }}
                  update={{
                    [TOGGLE_TAB_TRANSITION]: 'tab-text',
                    default: 'none',
                  }}
                >
                  <span className="relative z-1">{tab}</span>
                </ViewTransition>
              </button>
            );
          })}
        </div>
        <div className="flex-1 overflow-hidden w-full h-full">{tabs.get(activeTab)}</div>
      </div>
    </div>
  );
}
