/*
 Global function used for demo
*/

function noop() {
  // noop
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
