import { isFunction } from 'typesafe-is';

interface CallBack<This, Params extends any[]> {
  (this: This, ...args: Params): void;
}

export function debounce<This, Params extends any[]>(
  fn: CallBack<This, Params>,
  wait: number = 300
) {
  let timeout: number | undefined = undefined;

  return function(this: This, ...args: Params) {
    const context = this;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(function() {
      timeout = undefined;
      fn.apply(context, args);
    }, wait);
  };
}

export function throttle<This, Params extends any[]>(
  fn: CallBack<This, Params>,
  wait = 250,
  context: This = null as any
) {
  let timeout: undefined | number = undefined;
  let args: undefined | Params = undefined;

  const later = () => {
    args && fn.apply(context, args);
    timeout = undefined;
  };

  return function(...ars: Params) {
    if (!timeout) {
      args = ars;
      timeout = window.setTimeout(later, wait);
    }
  };
}

export const callAll = <Params extends any[]>(
  ...fns: Array<CallBack<void, Params> | undefined>
) => (...args: Params) => fns.forEach(fn => isFunction(fn) && fn(...args));
