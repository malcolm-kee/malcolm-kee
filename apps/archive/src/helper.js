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

/**
 *
 * @param {number} readtime
 */
export function getReadtimeText(readtime) {
  return readtime && readtime > 1
    ? `${readtime} minutes`
    : `${readtime} minute`;
}

/**
 * @param {string} hex
 */
export function getContrastTextColor(hex) {
  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  return cBrightness > threshold
    ? 'rgba(0, 0, 0, 0.87)'
    : 'rgba(255, 255, 255, 0.88)';
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
    .map((key) => `${key}=${params[key]}`)
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

  request.onload = function () {
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
 * @param {Function} [onLoad]
 */
export function preloadImage(imageSrc, onLoad) {
  const image = new Image();
  image.onload = onLoad;
  image.src = imageSrc;
}
