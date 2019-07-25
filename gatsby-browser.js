require('./src/styles/global.scss');
require('./src/styles/animations.scss');

exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`);
    console.log(`IntersectionObserver is polyfilled`);
  }

  // fetch polyfill required for urql
  if (typeof window.fetch === `undefined`) {
    import(`whatwg-fetch`);
    console.log(`fetch is polyfilled`);
  }
};
