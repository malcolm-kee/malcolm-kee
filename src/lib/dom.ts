export const scrollIntoView = (
  element: HTMLElement,
  block?: 'end' | 'start' | 'center'
) => {
  try {
    element.scrollIntoView({
      block,
      behavior: 'smooth',
    });
  } catch (e) {
    console.info(`Error scrollIntoView. Not a big deal.`);
  }
};
