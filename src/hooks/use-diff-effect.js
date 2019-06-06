import React from 'react';

/**
 * useDiffEffect is like useEffect hooks, with the only difference where the effect
 * will be invoked with the previous dependencies. On first render, prevDeps
 * will be null, so do not destructure without null check
 * @param {(prevDeps: any[]) => void} effect
 * @param {any[]} deps
 */
export const useDiffEffect = (effect, deps) => {
  const prevDeps = React.useRef(null);

  React.useEffect(() => {
    effect(prevDeps.current);

    prevDeps.current = deps;
  }, deps);
};

export default useDiffEffect;
