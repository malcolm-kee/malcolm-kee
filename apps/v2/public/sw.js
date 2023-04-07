/// <reference types="serviceworker" />

/**
 *
 * @param {ServiceWorkerGlobalScope} worker
 */
function initWorker(worker) {
  const cacheName = 'offline-contents';

  worker.addEventListener('install', (event) => {
    async function cacheOfflinePage() {
      try {
        const offlinePageResponse = await fetch('/_page-deps/offline.json');
        const offlineDeps = await offlinePageResponse.json();

        const files = ['/offline', ...offlineDeps.css, ...offlineDeps.images, ...offlineDeps.js];

        return caches.open(cacheName).then((cache) => cache.addAll(files));
      } catch (err) {
        console.error(err);
      }
    }

    event.waitUntil(cacheOfflinePage());
  });

  worker.addEventListener('fetch', (ev) => {
    async function networkFirstAndFallbackOffline() {
      try {
        const preloadResponse = await ev.preloadResponse;
        if (preloadResponse) {
          console.log('use preloadResponse', preloadResponse);
          return preloadResponse;
        }

        const networkResponse = await fetch(ev.request);

        return networkResponse;
      } catch (error) {
        // this error happens only when offline, not
        // "error" status code such as 404 or 500
        const cachedResponse = await caches.match(ev.request);

        if (cachedResponse) {
          console.log('use cachedResponse', cachedResponse);
          return cachedResponse;
        }

        if (ev.request.mode === 'navigate') {
          console.log('use offline html');
          // only returns offline page for page load request
          return caches.open(cacheName).then((cache) => cache.match('/offline'));
        }
      }
    }

    ev.respondWith(networkFirstAndFallbackOffline());
  });
}

initWorker(self);
