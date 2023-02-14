import { isIosChrome } from './is-ios-chrome';

/**
 * Bug: invoke iframe.contentWindow.print() will print parent page
 * instead of the iframe page
 */
export const isIFramePrintNotWorking = () => isIosChrome();
