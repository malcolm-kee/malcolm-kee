export const register = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js'); // in public folder
  }
};
