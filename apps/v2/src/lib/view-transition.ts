export const viewTransition = (callback: () => void | Promise<unknown>) => {
  if (document.startViewTransition) {
    return document.startViewTransition(callback);
  } else {
    callback();

    const resolved = Promise.resolve();

    return {
      ready: resolved,
      finished: resolved,
    };
  }
};
