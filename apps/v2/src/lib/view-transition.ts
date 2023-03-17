export const viewTransition = (callback: () => void) => {
  if (document.startViewTransition) {
    return document.startViewTransition(callback);
  } else {
    callback();
  }
};
