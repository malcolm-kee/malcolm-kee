/**
 * Hacks to detect is page running in IOS Chrome
 */
export const isIosChrome = () =>
  /CriOS/i.test(navigator.userAgent) &&
  /iphone|ipod|ipad/i.test(navigator.userAgent);
