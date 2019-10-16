import { isFunction } from 'typesafe-is';

interface CallBack<Params extends any[]> {
  (...args: Params): void;
}

export function debounce<Params extends any[]>(
  fn: CallBack<Params>,
  wait: number = 300
) {
  let timeout: number | undefined = undefined;

  return function(...args: Params) {
    const context = this;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(function() {
      timeout = undefined;
      fn.apply(context, args);
    }, wait);
  };
}

export function throttle<Params extends any[]>(
  fn: CallBack<Params>,
  wait = 250,
  context: any = null
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
  ...fns: Array<CallBack<Params> | undefined>
) => (...args: Params) => fns.forEach(fn => isFunction(fn) && fn(...args));
