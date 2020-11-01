require('focus-visible');
require('./src/styles/global.css');
require('./src/styles/animations.css');

exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === 'undefined') {
    import(`intersection-observer`).then(() => {
      console.log(`IntersectionObserver is polyfilled`);
    });
  }
};

exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation !== null) {
    // client-side routing happened!
    const skipLink = document.querySelector('#skip-main');
    if (skipLink && skipLink.focus) {
      skipLink.focus();
    }
  }
};
