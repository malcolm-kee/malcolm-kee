export const isVisible = (el: HTMLElement) => {
  return (
    !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) &&
    window.getComputedStyle(el).visibility !== 'hidden'
  );
};
