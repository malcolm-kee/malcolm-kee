import * as React from 'react';

type ObserveType = 'visible' | 'scrollover';

export const useObserver = (
  selectors: string[] | undefined,
  observeType: ObserveType = 'visible',
  threshold = 1
) => {
  const [showingItemIds, dispatch] = React.useReducer(observerReducer, []);

  React.useEffect(() => {
    if (selectors && selectors.length > 0) {
      const targetMap = new Map<Element, string>();

      const observer = new IntersectionObserver(
        entries => {
          dispatch({
            type: observeType,
            payload: [entries, targetMap],
          });
        },
        {
          threshold,
        }
      );

      selectors.forEach(selector => {
        const target = document.querySelector(selector);
        if (target) {
          targetMap.set(target, selector);
          observer.observe(target);
        }
      });

      return () => {
        observer.disconnect();
        targetMap.clear();
      };
    }
  }, [selectors, threshold]);

  return showingItemIds;
};

type ObserverActions =
  | {
      type: 'visible';
      payload: [IntersectionObserverEntry[], Map<Element, string>];
    }
  | {
      type: 'scrollover';
      payload: [IntersectionObserverEntry[], Map<Element, string>];
    };

const observerReducer: React.Reducer<string[], ObserverActions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'visible': {
      const [entries, map] = action.payload;
      const enteringItems: string[] = [];
      const leavingItems: string[] = [];
      entries.forEach(entry => {
        const selector = map.get(entry.target);
        if (selector) {
          if (entry.isIntersecting) {
            enteringItems.push(selector);
          } else {
            leavingItems.push(selector);
          }
        }
      });
      return state
        .filter(item => !leavingItems.includes(item))
        .concat(enteringItems);
    }

    case 'scrollover': {
      const [entries, map] = action.payload;
      const reachedItems: string[] = [];
      const leavingItems: string[] = [];

      entries.forEach(entry => {
        const selector = map.get(entry.target);
        if (selector) {
          const { top } = entry.boundingClientRect;
          if (entry.isIntersecting) {
            reachedItems.push(selector);
          } else {
            if (top < 0) {
              reachedItems.push(selector);
            } else {
              leavingItems.push(selector);
            }
          }
        }
      });

      return state
        .filter(item => !leavingItems.includes(item))
        .concat(reachedItems);
    }

    default:
      throw new Error(`Unsupported action type`);
  }
};
