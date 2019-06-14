require('./src/styles/global.scss');
require('./src/styles/animations.scss');

exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`);
    console.log(`IntersectionObserver is polyfilled`);
  }
};
