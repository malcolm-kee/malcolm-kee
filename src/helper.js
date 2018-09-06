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

export const joinStrings = delimiter => (...items) =>
  items
    .filter(
      item =>
        (typeof item === 'string' && item.length > 0) ||
        typeof item === 'number'
    )
    .join(delimiter);

export const getClassName = joinStrings(' ');
