require('./src/styles/global.scss');
require('./src/styles/animations.scss');

exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === 'undefined') {
    import(`intersection-observer`).then(() => {
      console.log(`IntersectionObserver is polyfilled`);
    });
  }

  // fetch polyfill required for urql
  if (typeof window.fetch === `undefined`) {
    import(`whatwg-fetch`).then(() => {
      console.log(`fetch is polyfilled`);
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
