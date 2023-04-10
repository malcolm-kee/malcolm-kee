/// <reference types="serviceworker" />

/**
 *
 * @param {ServiceWorkerGlobalScope} worker
 */
function initWorker(worker) {
  var cacheName = 'offline-contents';

  var offlinePagePath = __OFFLINE_PAGE_PATH__;
  var files = __PRECACHED_ASSETS__;

  worker.addEventListener('install', (installEvent) => {
    async function cacheOfflinePage() {
      try {
        return caches.open(cacheName).then((cache) => cache.addAll(files));
      } catch (err) {
        console.error(err);
      }
    }

    installEvent.waitUntil(cacheOfflinePage());
  });

  worker.addEventListener('activate', (activateEvent) => {
    activateEvent.waitUntil(
      caches.open(cacheName).then(async (cache) => {
        const allKeys = await cache.keys();
        const staledKeys = allKeys.filter(
          (requestInit) => !files.includes(new URL(requestInit.url).pathname)
        );

        await Promise.all(staledKeys.map((k) => cache.delete(k)));
      })
    );
  });

  worker.addEventListener('fetch', (fetchEvent) => {
    async function networkFirstAndFallbackOffline() {
      try {
        const preloadResponse = await fetchEvent.preloadResponse;
        if (preloadResponse) {
          console.log('use preloadResponse', preloadResponse);
          return preloadResponse;
        }

        const networkResponse = await fetch(fetchEvent.request);

        return networkResponse;
      } catch (error) {
        // this error happens only when offline, not
        // "error" status code such as 404 or 500
        const cachedResponse = await caches.match(fetchEvent.request);

        if (cachedResponse) {
          console.log('use cachedResponse', cachedResponse);
          return cachedResponse;
        }

        if (fetchEvent.request.mode === 'navigate') {
          // only returns offline page for page load request
          console.log('use offline html');

          const offlineCache = await caches.open(cacheName);

          return await offlineCache.match(offlinePagePath);
        }
      }
    }

    fetchEvent.respondWith(networkFirstAndFallbackOffline());
  });
}

initWorker(self);
