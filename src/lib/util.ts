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
