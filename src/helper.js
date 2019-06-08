import { isFunction } from 'typesafe-is';

export function debounce(fn, wait) {
  var timeout;

  return function(...args) {
    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      fn.apply(context, args);
    }, wait);
  };
}

export function throttle(fn, wait = 250, context = this) {
  let timeout = null;
  let args = null;

  const later = () => {
    fn.apply(context, args);
    timeout = null;
  };

  return function(...ars) {
    if (!timeout) {
      args = ars;
      timeout = setTimeout(later, wait);
    }
  };
}

/**
 *
 * @param {number} readtime
 */
export function getReadtimeText(readtime) {
  return readtime && readtime > 1
    ? `${readtime} minutes`
    : `${readtime} minute`;
}

export const callAll = (...fns) => (...args) =>
  fns.forEach(fn => isFunction(fn) && fn(...args));

/**
 * @param {string} hex
 */
export function getContrastTextColor(hex) {
  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  return cBrightness > threshold ? '#000000' : '#ffffff';
}

function cutHex(h) {
  return h.charAt(0) === '#' ? h.substring(1, 7) : h;
}
function hexToR(h) {
  return parseInt(cutHex(h).substring(0, 2), 16);
}
function hexToG(h) {
  return parseInt(cutHex(h).substring(2, 4), 16);
}
function hexToB(h) {
  return parseInt(cutHex(h).substring(4, 6), 16);
}

export function getGithubIssueLink(repositoryUrl, params) {
  const paramString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  return encodeURI(`${repositoryUrl}/issues/new?${paramString}`);
}
