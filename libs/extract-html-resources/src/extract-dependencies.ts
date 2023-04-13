import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';

import { init, parse as parseEsModule } from 'es-module-lexer';
import type { Plugin as PostcssPlugin, PluginCreator as PostcssPluginCreator } from 'postcss';
import { request } from 'undici';

const require = createRequire(import.meta.url);

const postcss = require('postcss');

export interface ExtractDependenciesOptions {
  excludes: Array<RegExp>;
  root: URL;
}

export interface Resources {
  css: Set<string>;
  js: Set<string>;
  images: Set<string>;
  fonts: Set<string>;
}

export const extractDependencies = async (
  filePath: URL,
  options: ExtractDependenciesOptions
): Promise<{
  css: ReadonlySet<string>;
  js: ReadonlySet<string>;
  images: ReadonlySet<string>;
  fonts: ReadonlySet<string>;
}> => {
  const content = await fs.readFile(filePath, {
    encoding: 'utf-8',
  });

  const resources: Resources = {
    css: new Set(),
    js: new Set(),
    images: new Set(),
    fonts: new Set(),
  };

  const { Parser } = await import('htmlparser2');

  const parser = new Parser({
    onopentag(name, attributes) {
      switch (name) {
        case 'script':
          if (attributes.src) {
            if (!options.excludes.some((pattern) => pattern.test(attributes.src))) {
              resources.js.add(attributes.src);
            }
          }
          break;

        case 'link':
          if (attributes.rel === 'stylesheet' && attributes.href) {
            if (!options.excludes.some((pattern) => pattern.test(attributes.href))) {
              resources.css.add(attributes.href);
            }
          }
          break;

        case 'img':
          if (attributes.src) {
            if (!options.excludes.some((pattern) => pattern.test(attributes.src))) {
              resources.images.add(attributes.src);
            }
          }
          break;

        case 'astro-island':
          if (attributes['component-url']) {
            resources.js.add(attributes['component-url']);
          }
          if (attributes['renderer-url']) {
            resources.js.add(attributes['renderer-url']);
          }

          break;

        default:
          break;
      }
    },
  });
  parser.write(content);
  parser.end();

  for (const cssFileUrl of resources.css) {
    await getCssDependencies(cssFileUrl, options, resources);
  }

  await init;

  for (const jsFileUrl of resources.js) {
    const additionalDeps = await getJsDependencies(jsFileUrl, options);
    additionalDeps.forEach((d) => resources.js.add(d));
  }

  return resources;
};

const urlRegex = /url\(["']?(.*?)["']?\)/gi;

async function getCssDependencies(
  cssResourceUrl: string,
  options: { root: URL; excludes: Array<RegExp> },
  resources: Resources
): Promise<void> {
  const cssSource = await getResourceContent(cssResourceUrl, options.root);

  if (!cssSource) {
    return;
  }

  const postcssExtractUrlPlugin: PostcssPluginCreator<{}> = Object.assign(
    function postcssExtractUrlPlugin(): PostcssPlugin {
      return {
        postcssPlugin: 'extract-url',
        AtRule: {
          'font-face': (fontFaceAtRule) => {
            fontFaceAtRule.walkDecls('src', (declaration) => {
              if (urlRegex.test(declaration.value)) {
                const regex = new RegExp(urlRegex.source, urlRegex.flags);

                let match;

                while ((match = regex.exec(declaration.value)) !== null) {
                  if (match[1]) {
                    resources.fonts.add(match[1]);
                  }
                }
              }
            });
          },
        },
      };
    },
    { postcss: true as const }
  );

  const processer = postcss([postcssExtractUrlPlugin]);

  await processer.process(cssSource, { from: undefined });
}

async function getJsDependencies(
  jsResourceUrl: string,
  options: { root: URL; excludes: Array<RegExp> },
  output: Array<string> = []
) {
  const jsSource = await getResourceContent(jsResourceUrl, options.root);

  if (!jsSource) {
    return output;
  }

  try {
    const [imports] = parseEsModule(jsSource);

    for (const { n } of imports) {
      if (n) {
        const importedFilePath = new URL(n, new URL(jsResourceUrl, options.root));

        const resourceUrl =
          importedFilePath.protocol === 'file:'
            ? path.resolve(
                '/',
                path.relative(fileURLToPath(options.root), fileURLToPath(importedFilePath))
              )
            : importedFilePath.toString();

        if (
          !output.includes(resourceUrl) &&
          !options.excludes.some((pattern) => pattern.test(resourceUrl))
        ) {
          output.push(resourceUrl);

          await getJsDependencies(resourceUrl, options, output);
        }
      }
    }
  } catch (err) {
    console.error(err);
    console.log({
      options,
      jsResourceUrl,
    });
  }

  return output;
}

async function getResourceContent(contentUrl: string, root: URL): Promise<string | undefined> {
  if (contentUrl.startsWith('/')) {
    const jsFilePath = path.resolve(fileURLToPath(root), `.${contentUrl}`);
    return await fs.readFile(jsFilePath, 'utf-8');
  }
  if (/^https?:\/\//.test(contentUrl)) {
    const response = await request(contentUrl);

    if (
      response.headers &&
      response.headers['content-type'] &&
      !response.headers['content-type'].includes('text/html')
    ) {
      const content = await response.body.text();

      return content;
    }
  }
}
