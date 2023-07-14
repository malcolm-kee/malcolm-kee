declare global {
  interface Window {
    __swRegistration: ServiceWorkerRegistration;
  }
}

export const register = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js') // in public folder
      .then((registration) => {
        window.__swRegistration = registration;
      });
  }
};

export const getServiceWorkerRegistration = () => window.__swRegistration;
