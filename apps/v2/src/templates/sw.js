/// <reference types="serviceworker" />

/**
 *
 * @param {ServiceWorkerGlobalScope} worker
 */
function initWorker(worker) {
  var cacheName = 'offline-contents';
  var offlineFirstCacheName = 'offline-first-contents';

  var offlinePagePath = __OFFLINE_PAGE_PATH__;
  var files = __PRECACHED_ASSETS__;
  /** @type {string[]} */
  var offlineFirstAssets = __OFFLINE_FIRST_ASSETS__;

  worker.addEventListener('install', (installEvent) => {
    async function cacheOfflinePage() {
      try {
        const [cache, preferredCache] = await Promise.all([
          caches.open(cacheName),
          caches.open(offlineFirstCacheName),
        ]);

        await Promise.all([cache.addAll(files), preferredCache.addAll(offlineFirstAssets)]);
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
        const offlineFirstCache = await caches.open(offlineFirstCacheName);

        const offlineFirstResource = await offlineFirstCache.match(fetchEvent.request);

        if (offlineFirstResource) {
          console.log('use offline resource');
          return offlineFirstResource;
        }

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

  worker.addEventListener('push', (pushEvent) => {
    if (pushEvent.data) {
      try {
        /**
         * @type {{
         *  notification?: {
         *    title?: string;
         *    body?: string;
         *    url?: string;
         *    tag?: string;
         *    badge?: string;
         *    icon?: string;
         *    image?: string;
         *  }
         * }}
         */
        const pushData = pushEvent.data.json();

        // do a very tedious check to ensure not showing empty notification
        if (
          pushData &&
          typeof pushData === 'object' &&
          'notification' in pushData &&
          typeof pushData.notification === 'object' &&
          pushData.notification.title
        ) {
          const notificationPromise = worker.registration.showNotification(
            pushData.notification.title,
            {
              body: pushData.notification.body,
              tag: pushData.notification.tag,
              icon: pushData.notification.icon,
              badge: pushData.notification.badge,
              image: pushData.notification.image,
              data: {
                url: pushData.notification.url,
              },
            }
          );

          return pushEvent.waitUntil(notificationPromise);
        }
      } catch (err) {
        console.error(err);
      }
    }
    console.log('push event without data');
  });

  worker.addEventListener('notificationclick', (clickEvent) => {
    clickEvent.notification.close();

    if (clickEvent.notification.data && clickEvent.notification.data.url) {
      clickEvent.waitUntil(clients.openWindow(clickEvent.notification.data.url));
    }
  });
}

initWorker(self);
