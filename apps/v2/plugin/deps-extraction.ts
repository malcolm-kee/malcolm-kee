import { extractDependencies } from '@mkee/extract-html-resources';
import type { AstroIntegration } from 'astro';

export const depsExtraction = (): AstroIntegration => {
  return {
    name: 'mkee:deps-extraction',
    hooks: {
      'astro:build:done': async ({ routes, dir }) => {
        const offlineRoute = routes.find((r) => r.route === '/offline');

        if (offlineRoute?.distURL) {
          const result = await extractDependencies(offlineRoute.distURL, {
            excludes: [],
            root: dir,
          });

          console.log(result);
        }
      },
    },
  };
};
