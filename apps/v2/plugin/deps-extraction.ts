import { existsSync as dirExists } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { extractDependencies } from '@mkee/extract-html-resources';
import type { AstroIntegration } from 'astro';

export const depsExtraction = (options: {
  routes: Array<string>;
  excludes: Array<RegExp>;
}): AstroIntegration => {
  return {
    name: 'mkee:deps-extraction',
    hooks: {
      'astro:build:done': async ({ routes, dir }) => {
        const routesToCheck = routes.filter((r) => options.routes.includes(r.route));

        const outputDir = path.resolve(fileURLToPath(dir), '_page-deps');

        if (!dirExists(outputDir)) {
          await fs.mkdir(outputDir);
        }

        for (const route of routesToCheck) {
          if (route.distURL) {
            const result = await extractDependencies(route.distURL, {
              excludes: options.excludes,
              root: dir,
            });

            if (result.css.size > 0 || result.images.size > 0 || result.js.size > 0) {
              const serializedResult = {
                css: Array.from(result.css),
                images: Array.from(result.images),
                js: Array.from(result.js),
              };

              await fs.writeFile(
                path.resolve(outputDir, `.${route.route}.json`),
                JSON.stringify(serializedResult),
                'utf-8'
              );
            }
          }
        }
      },
    },
  };
};
