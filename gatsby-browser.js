require('./src/styles/global.scss');
require('./src/styles/animations.scss');
const scrollTo = require('scroll-to-element');

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

function checkHash(location) {
  const { hash } = location;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      scrollTo(target, {
        offset: window.innerWidth >= 576 ? -70 : -10,
        duration: 1,
      });
    }
  }
}

exports.onInitialClientRender = () => {
  window.addEventListener('hashchange', () => {
    checkHash(window.location);
  });
};

exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation !== null) {
    // client-side routing happened!
    const skipLink = document.querySelector('#skip-main');
    if (skipLink && skipLink.focus) {
      skipLink.focus();
    }
  }

  checkHash(location);
};
