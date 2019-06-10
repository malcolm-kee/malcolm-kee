require('./src/styles/global.scss');
require('./src/styles/animations.scss');
const { ajax } = require('./src/global');

exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`);
    console.log(`IntersectionObserver is polyfilled`);
  }

  window.ajax = ajax;
};
