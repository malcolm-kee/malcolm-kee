import fs from 'node:fs/promises';
import { URL } from 'node:url';

const extractCssDependencies = async (cssContent: string) => {
  const { find, parse, walk } = await import('css-tree');

  const styleSheet = parse(cssContent);

  const fontResources = new Set<string>();

  walk(styleSheet, function (node) {
    if (node.type === 'Atrule' && node.name === 'font-face') {
      const urlNode = find(node, (n) => n.type === 'Url');

      if (urlNode && urlNode.type === 'Url' && urlNode.value) {
        fontResources.add(urlNode.value);
      }
    }
  });

  return {
    fonts: fontResources,
  };
};

export interface ExtractDependenciesOptions {
  excludes: Array<RegExp>;
  root: URL;
}

export const extractDependencies = async (
  filePath: URL,
  { excludes, root }: ExtractDependenciesOptions
) => {
  console.log({
    filePath,
    excludes,
    root,
  });

  const content = await fs.readFile(filePath, {
    encoding: 'utf-8',
  });

  const resources = {
    css: new Set<string>(),
    js: new Set<string>(),
    images: new Set<string>(),
    fonts: new Set<string>(),
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

        default:
          break;
      }
    },
  });
  parser.write(content);
  parser.end();

  for (const cssUrl of resources.css) {
    if (cssUrl.startsWith('/')) {
      const target = new URL(`.${cssUrl}`, root);

      const cssContent = await fs.readFile(target, {
        encoding: 'utf-8',
      });

      const deps = await extractCssDependencies(cssContent);

      deps.fonts.forEach(resources.fonts.add, resources.fonts);
    } else if (cssUrl.startsWith('https://')) {
      const { request } = await import('undici');
      const response = await request(cssUrl);
      const content = await response.body.text();

      const deps = await extractCssDependencies(content);

      deps.fonts.forEach(resources.fonts.add, resources.fonts);
    }
  }

  return resources;
};
