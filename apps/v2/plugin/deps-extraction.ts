import { fileURLToPath } from 'node:url';

import { extractDependencies } from '@mkee/extract-html-resources';
import { parse } from 'node-html-parser';
import type { AstroIntegration } from 'astro';
import fs from 'fs-extra';

export const depsExtraction = (options: {
  routes: Array<string | RegExp>;
  excludes: Array<RegExp>;
  serviceWorker?: {
    templateUrl: URL;
    offlinePagePath: string;
    outputFileName: string;
  };
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
          const pagePath = trimSlash(pathname);

          const htmlFilePath = new URL(`${pagePath}/index.html`, dir);

          const [result, originalHtml] = await Promise.all([
            extractDependencies(htmlFilePath, {
              excludes: options.excludes,
              root: dir,
            }),
            fs.readFile(htmlFilePath, 'utf-8'),
          ]);

          const serializedResult = {
            css: Array.from(result.css),
            images: Array.from(result.images),
            js: Array.from(result.js),
            fonts: Array.from(result.fonts),
          };

          await fs.outputFile(
            fileURLToPath(new URL(`_page-deps/${pagePath}.json`, dir)),
            JSON.stringify(serializedResult),
            'utf-8'
          );

          const root = parse(originalHtml);
          root.querySelector('html')?.setAttribute('data-cansave', 'true');

          await fs.writeFile(htmlFilePath, root.toString(), 'utf-8');
        }

        if (options.serviceWorker) {
          const { templateUrl, offlinePagePath, outputFileName } = options.serviceWorker;

          const pagePath = trimSlash(offlinePagePath);

          const dependencies = await extractDependencies(new URL(`${pagePath}/index.html`, dir), {
            excludes: options.excludes,
            root: dir,
          });

          const templateContent = await fs.readFile(templateUrl, {
            encoding: 'utf-8',
          });

          const runtimeOfflinePagePath = `/${pagePath}/`;

          const output = templateContent
            .replace('__OFFLINE_PAGE_PATH__', `'${runtimeOfflinePagePath}'`)
            .replace(
              '__PRECACHED_ASSETS__',
              JSON.stringify([
                runtimeOfflinePagePath,
                ...dependencies.css,
                ...dependencies.images,
                ...dependencies.js,
              ])
            )
            .replace('__OFFLINE_FIRST_ASSETS__', JSON.stringify([...dependencies.fonts]));

          await fs.outputFile(fileURLToPath(new URL(outputFileName, dir)), output, 'utf-8');
        }
      },
    },
  };
};

const trimSlash = (text: string) => text.replace(/^\/|\/$/g, '');
