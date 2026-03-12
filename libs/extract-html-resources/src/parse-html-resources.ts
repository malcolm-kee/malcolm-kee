import { Parser } from 'htmlparser2';

import type { Resources } from './extract-dependencies';

export function parseHtmlResources(
  content: string,
  options: { excludes: Array<RegExp> }
): Resources {
  const resources: Resources = {
    css: new Set(),
    js: new Set(),
    images: new Set(),
    fonts: new Set(),
  };

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

  return resources;
}
