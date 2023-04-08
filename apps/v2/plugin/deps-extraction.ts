import { fileURLToPath } from 'node:url';

import { extractDependencies } from '@mkee/extract-html-resources';
import type { AstroIntegration } from 'astro';
import fs from 'fs-extra';

export const depsExtraction = (options: {
  routes: Array<string | RegExp>;
  excludes: Array<RegExp>;
}): AstroIntegration => {
  return {
    name: 'mkee:deps-extraction',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const pagesToCheck = pages.filter((p) =>
          options.routes.some((r) =>
            typeof r === 'string' ? r === p.pathname : r.test(p.pathname)
          )
        );

        for (const { pathname } of pagesToCheck) {
          const pagePath = pathname.replace(/\/$/, '');

          const result = await extractDependencies(new URL(`${pagePath}/index.html`, dir), {
            excludes: options.excludes,
            root: dir,
          });

          const serializedResult = {
            css: Array.from(result.css),
            images: Array.from(result.images),
            js: Array.from(result.js),
          };

          await fs.outputFile(
            fileURLToPath(new URL(`_page-deps/${pagePath}.json`, dir)),
            JSON.stringify(serializedResult),
            'utf-8'
          );
        }
      },
    },
  };
};
