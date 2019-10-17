export const scrollIntoViewIfTooLow = (
  element: HTMLElement,
  block: 'end' | 'start' | 'center' = 'end'
) => {
  try {
    const clientRect = element.getBoundingClientRect();
    if (
      clientRect.bottom >
      (window.innerHeight || document.documentElement.clientHeight)
    ) {
      element.scrollIntoView({
        block,
        behavior: 'smooth',
      });
    }
  } catch (e) {
    console.info(`Error scrollIntoView. Not a big deal.`);
  }
};
