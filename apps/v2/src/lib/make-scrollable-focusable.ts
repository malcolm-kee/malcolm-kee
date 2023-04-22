/**
 * Make elements that are scrollable focusable so keyboard user can scroll them.
 *
 * This is a naive implementation: it does not handle elements become overflow when
 * viewport changes after initial page load.
 *
 * However it is good enough for now, assuming most users don't resize window.
 *
 * @param selector CSS selector for target elements
 *
 */
export const makeScrollableFocusable = (selector: string) => {
  document.querySelectorAll(selector).forEach((element) => {
    if (element instanceof HTMLElement && isScrollable(element)) {
      element.setAttribute('tabindex', '0');
      element.classList.add(
        'focus-visible:ring',
        'focus-visible:ring-primary-100',
        'focus-visible:ring-inset'
      );
    }
  });
};

function isScrollable(element: HTMLElement) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
