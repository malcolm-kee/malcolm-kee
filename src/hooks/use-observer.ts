import * as React from 'react';

type ObserveType = 'visible' | 'scrollover';

type ObserveOptions = {
  threshold?: number;
  rootMargin?: string;
  observeType?: ObserveType;
};

export const useObserver = (
  selectors: string[] | undefined,
  { threshold = 1, rootMargin, observeType = 'scrollover' }: ObserveOptions = {}
) => {
  const [showingItemIds, dispatch] = React.useReducer(observerReducer, []);

  React.useEffect(() => {
    if (selectors && selectors.length > 0) {
      const targetMap = new Map<Element, string>();

      const observer = new IntersectionObserver(
        (entries) => {
          dispatch({
            type: observeType,
            payload: [entries, targetMap],
          });
        },
        {
          threshold,
          rootMargin,
        }
      );

      selectors.forEach((selector) => {
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
  }, [selectors, threshold, rootMargin]);

  return showingItemIds;
};

type ObserverActions = {
  type: ObserveType;
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
      entries.forEach((entry) => {
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
        .filter((item) => !leavingItems.includes(item))
        .concat(enteringItems);
    }

    case 'scrollover': {
      const [entries, map] = action.payload;
      const reachedItems: string[] = [];

      map.forEach((value, key) => {
        const { top } = key.getBoundingClientRect();
        if (top < 0) {
          reachedItems.push(value);
        }
      });

      entries.forEach((entry) => {
        const selector = map.get(entry.target);
        if (
          selector &&
          entry.isIntersecting &&
          !reachedItems.includes(selector)
        ) {
          reachedItems.push(selector);
        }
      });

      return reachedItems;
    }

    default:
      throw new Error(`Unsupported action type`);
  }
};
