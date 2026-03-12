import { createRequire } from 'node:module';

import type {
  Plugin as PostcssPlugin,
  PluginCreator as PostcssPluginCreator,
  Postcss,
} from 'postcss';

const require = createRequire(import.meta.url);

const postcss: Postcss = require('postcss');

const urlRegex = /url\(["']?(.*?)["']?\)/gi;

export async function extractCssFontUrls(cssSource: string): Promise<string[]> {
  const fonts: string[] = [];

  const postcssExtractUrlPlugin: PostcssPluginCreator<{}> = Object.assign(
    function postcssExtractUrlPlugin(): PostcssPlugin {
      return {
        postcssPlugin: 'extract-url',
        AtRule: {
          'font-face': (fontFaceAtRule) => {
            fontFaceAtRule.walkDecls('src', (declaration) => {
              urlRegex.lastIndex = 0;
              if (urlRegex.test(declaration.value)) {
                const regex = new RegExp(urlRegex.source, urlRegex.flags);

                let match;

                while ((match = regex.exec(declaration.value)) !== null) {
                  if (match[1]) {
                    fonts.push(match[1]);
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

  return fonts;
}
