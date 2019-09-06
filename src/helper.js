import { isArray, isFunction } from 'typesafe-is';

export function noop() {
  // noop
}

export function copyToClipboard(textToCopy) {
  const currentActive = document.activeElement;

  const textarea = document.createElement('textarea');
  textarea.value = textToCopy;
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand('copy');

  document.body.removeChild(textarea);

  if (currentActive && currentActive !== document.body) {
    currentActive.focus();
  }
}

export function lastItem(array) {
  return isArray(array) ? array[array.length - 1] : array;
}

/**
 *
 * @param {number} length
 */
export function createEmptyArray(length) {
  if (Array.from) {
    return Array.from({ length });
  }

  const result = [];

  for (let index = 0; index < length; index++) {
    result.push(undefined);
  }

  return result;
}

/**
 * Check if an item is within an array OR if a string is part of a bigger string
 * @template T
 * @param {Array<T> | string} array
 * @param {T | string} item
 */
export function includes(array, item) {
  return (
    (Array.isArray(array) || typeof array === 'string') &&
    array.indexOf(item) > -1
  );
}

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

export function ajax(url, options) {
  var opts = options || {};
  var onSuccess = opts.onSuccess || noop;
  var onError = opts.onError || noop;
  var dataType = opts.dataType || 'json';
  var method = opts.method || 'GET';

  var request = new XMLHttpRequest();
  request.open(method, url);
  if (dataType === 'json') {
    request.overrideMimeType('application/json');
    request.responseType = 'json';
    request.setRequestHeader('Accept', 'application/json');
  }

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      onSuccess(request.response);
    } else {
      onError(request.response);
    }
  };

  request.onerror = onError;

  request.send(opts.body);
}

/**
 * preload image so when it is needed it will shown instantly
 * @param {string} imageSrc
 */
export function preloadImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
}
