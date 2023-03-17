import * as React from 'react';
import { flushSync } from 'react-dom';
import { viewTransition } from '~/lib/view-transition';
import styles from './animated-tabs.module.css';
import { clsx } from 'clsx';

export interface AnimatedTabsProps {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
}

export const AnimatedTabs = ({ tabs }: AnimatedTabsProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const activate = React.useCallback((index: number) => {
    viewTransition(() => {
      flushSync(() => setActiveIndex(index));
    });
  }, []);

  return (
    <div className="shadow overflow-hidden">
      <div className="flex overflow-y-auto border-b border-zinc-100">
        {tabs.map((tab, index) => (
          <button
            type="button"
            onClick={index !== activeIndex ? () => activate(index) : undefined}
            data-active={activeIndex === index}
            className={styles.button}
            key={index}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={clsx('px-3', styles.tab)}>{tabs[activeIndex]?.content}</div>
    </div>
  );
};

export const TabsDemo = () => {
  return (
    <AnimatedTabs
      tabs={[
        {
          label: 'Tab 1',
          content: (
            <div>
              <h3>Some content here</h3>
            </div>
          ),
        },
        {
          label: 'Longer Tab Label',
          content: (
            <div>
              <h3>Different content here</h3>
            </div>
          ),
        },
        {
          label: 'Another',
          content: (
            <div>
              <h3>Another content here</h3>
            </div>
          ),
        },
        {
          label: 'Final',
          content: (
            <div>
              <h3>Final content here</h3>
            </div>
          ),
        },
      ]}
    />
  );
};
