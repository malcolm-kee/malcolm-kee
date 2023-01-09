export const getLinkTarget = (link: string) => {
  switch (link[0]) {
    case '/':
      return 'inner';

    case '#':
      return 'hash';

    default:
      return 'outer';
  }
};

export const removeTrailingSlash = (link: string): string => {
  const lastCharIndex = link.length - 1;

  return link && link !== '/' && link[lastCharIndex] === '/'
    ? link.substring(0, lastCharIndex)
    : link;
};
