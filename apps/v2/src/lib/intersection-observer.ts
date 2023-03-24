export const onIntersectOnce = (options: {
  elements: ArrayLike<Element> & { forEach: (callbackFn: (element: Element) => void) => void };
  callback: (element: Element) => void;
  observeOptions: IntersectionObserverInit;
}) => {
  const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        options.callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options.observeOptions);

  options.elements.forEach((element) => observer.observe(element));
};
