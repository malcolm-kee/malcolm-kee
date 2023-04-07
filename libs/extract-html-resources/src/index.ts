import path from 'node:path';
import fs from 'node:fs/promises';
import { URL, fileURLToPath } from 'node:url';

import { init, parse as parseEsModule } from 'es-module-lexer';
import { request } from 'undici';

export interface ExtractDependenciesOptions {
  excludes: Array<RegExp>;
  root: URL;
}

export const extractDependencies = async (
  filePath: URL,
  { excludes, root }: ExtractDependenciesOptions
) => {
  const content = await fs.readFile(filePath, {
    encoding: 'utf-8',
  });

  const resources = {
    css: new Set<string>(),
    js: new Set<string>(),
    images: new Set<string>(),
  };

  const { Parser } = await import('htmlparser2');

  const parser = new Parser({
    onopentag(name, attributes) {
      switch (name) {
        case 'script':
          if (attributes.src) {
            if (!excludes.some((pattern) => pattern.test(attributes.src))) {
              resources.js.add(attributes.src);
            }
          }
          break;

        case 'link':
          if (attributes.rel === 'stylesheet' && attributes.href) {
            if (!excludes.some((pattern) => pattern.test(attributes.href))) {
              resources.css.add(attributes.href);
            }
          }
          break;

        case 'img':
          if (attributes.src) {
            if (!excludes.some((pattern) => pattern.test(attributes.src))) {
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

  await init;

  for (const jsFileUrl of resources.js) {
    const additionalDeps = await getJsDependencies(jsFileUrl, {
      root,
    });
    additionalDeps.forEach((d) => resources.js.add(d));
  }

  return resources;
};

async function getJsDependencies(
  jsResourceUrl: string,
  options: { root: URL },
  output: Array<string> = []
) {
  const jsSource = await getResourceContent(jsResourceUrl, options.root);

  try {
    const [imports] = parseEsModule(jsSource);

    for (const { n } of imports) {
      if (n) {
        const importedFilePath = new URL(n, new URL(jsResourceUrl, options.root));

        const resourceUrl = path.resolve(
          '/',
          path.relative(fileURLToPath(options.root), fileURLToPath(importedFilePath))
        );

        output.push(resourceUrl);

        await getJsDependencies(
          resourceUrl,
          {
            root: options.root,
          },
          output
        );
      }
    }
  } catch (err) {
    console.error(err);
  }

  return output;
}

async function getResourceContent(contentUrl: string, root: URL) {
  if (typeof contentUrl === 'string') {
    if (contentUrl.startsWith('/')) {
      const jsFilePath = path.resolve(fileURLToPath(root), `.${contentUrl}`);
      return await fs.readFile(jsFilePath, 'utf-8');
    }
    if (/^https?:\/\//.test(contentUrl)) {
      const response = await request(contentUrl);
      const content = await response.body.text();

      return content;
    }
  }

  console.error(contentUrl);
  throw new Error(`Unhandled file: ${contentUrl}`);
}
