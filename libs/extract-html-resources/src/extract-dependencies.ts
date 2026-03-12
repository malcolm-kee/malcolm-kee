import fs from 'node:fs/promises';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';

import { extractCssFontUrls } from './extract-css-font-urls';
import { parseHtmlResources } from './parse-html-resources';
import { parseJsImports } from './parse-js-imports';

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

  const resources = parseHtmlResources(content, options);

  for (const cssFileUrl of resources.css) {
    const cssSource = await getResourceContent(cssFileUrl, options.root);

    if (cssSource) {
      const fontUrls = await extractCssFontUrls(cssSource);
      fontUrls.forEach((url) => resources.fonts.add(url));
    }
  }

  for (const jsFileUrl of resources.js) {
    const additionalDeps = await getJsDependencies(jsFileUrl, options);
    additionalDeps.forEach((d) => resources.js.add(d));
  }

  return resources;
};

async function getJsDependencies(
  jsResourceUrl: string,
  options: { root: URL; excludes: Array<RegExp> },
  output: Array<string> = []
) {
  const jsSource = await getResourceContent(jsResourceUrl, options.root);

  if (!jsSource) {
    return output;
  }

  const imports = await parseJsImports(jsSource, jsResourceUrl, options);

  for (const resourceUrl of imports) {
    if (!output.includes(resourceUrl)) {
      output.push(resourceUrl);
      await getJsDependencies(resourceUrl, options, output);
    }
  }

  return output;
}

async function getResourceContent(contentUrl: string, root: URL): Promise<string | undefined> {
  if (contentUrl.startsWith('/')) {
    const jsFilePath = path.resolve(fileURLToPath(root), `.${contentUrl}`);
    return await fs.readFile(jsFilePath, 'utf-8');
  }
  if (/^https?:\/\//.test(contentUrl)) {
    const response = await fetch(contentUrl);
    const contentType = response.headers.get('content-type');

    if (contentType && !contentType.includes('text/html')) {
      return await response.text();
    }
  }
}
