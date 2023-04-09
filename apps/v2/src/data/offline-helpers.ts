import { db } from './offline-db';

export interface PageDependencies {
  css: string[];
  js: string[];
  images: string[];
}

const getPageDependencies = async (pagePath: string): Promise<PageDependencies | undefined> => {
  const response = await fetch(`/_page-deps/${pagePath}.json`);

  const contentType = response.headers.get('content-type');

  if (response.ok && contentType && contentType.includes('application/json')) {
    return response.json();
  }
};

export const requestPersistentStorage = async () => {
  if (navigator && navigator.storage && typeof navigator.storage.persist === 'function') {
    if (!(await navigator.storage.persisted())) {
      return await navigator.storage.persist();
    }
  }
};

const cacheName = 'offline-pages';

export const getSavedPage = async (pagePath: string) => {
  return await db.blogs.where('path').equals(pagePath).first();
};

export const savePageDependencies = async (pagePath: string, dependencies: PageDependencies) => {
  const offlinePagesCache = await caches.open(cacheName);

  const resources = [
    `/${pagePath}/`,
    ...dependencies.css,
    ...dependencies.images,
    ...dependencies.js,
  ]
    // service worker can't intercept cross-origin request anyway
    .filter((resource) => resource.startsWith('/'));

  await offlinePagesCache.addAll(resources);

  await db.blogs.put({
    path: pagePath,
    resources,
    info: {},
  });
};

export const removePage = async (pagePath: string) => {
  const offlinePagesCache = await caches.open(cacheName);

  const resourcesToDelete = await db.transaction('rw', db.blogs, async () => {
    const pageData = await db.blogs.where('path').equals(pagePath).first();
    if (pageData) {
      await db.blogs.delete(pagePath);
      const results = await Promise.all(
        pageData.resources.map(async (resource) => {
          const count = await db.blogs.where('resources').equals(resource).count();

          return {
            resource,
            count,
          };
        })
      );

      return results.filter((d) => d.count === 0);
    }
  });

  if (resourcesToDelete && resourcesToDelete.length > 0) {
    console.log('Deleting', resourcesToDelete);
    await Promise.all(resourcesToDelete.map((r) => offlinePagesCache.delete(r.resource)));
  }
};

export type PageSaveCapability =
  | {
      allowed: false;
    }
  | {
      allowed: true;
      saved: boolean;
      dependencies: PageDependencies;
    };

export const loadPageSaveCapability = async (pagePath: string): Promise<PageSaveCapability> => {
  const dependencies = await getPageDependencies(pagePath);

  if (dependencies) {
    const current = await getSavedPage(pagePath);

    if (current) {
      // refresh cache and remove staled resources
      await savePageDependencies(pagePath, dependencies);
      const currentResources = [...dependencies.css, ...dependencies.images, ...dependencies.js];
      const resourceThatMaybeStaled = current.resources.filter(
        (r) => !currentResources.includes(r)
      );

      const staledResources = await db.transaction('rw', db.blogs, async () => {
        const results = await Promise.all(
          resourceThatMaybeStaled.map(async (resource) => {
            const count = await db.blogs.where('resources').equals(resource).count();

            return {
              resource,
              count,
            };
          })
        );

        return results.filter((r) => r.count === 0);
      });

      if (staledResources && staledResources.length > 0) {
        console.log({ staledResources });
        const offlinePagesCache = await caches.open(cacheName);
        await Promise.all(staledResources.map((r) => offlinePagesCache.delete(r.resource)));
      }

      return {
        allowed: true,
        saved: true,
        dependencies,
      };
    } else {
      return {
        allowed: true,
        saved: false,
        dependencies,
      };
    }
  }

  return {
    allowed: false,
  };
};
