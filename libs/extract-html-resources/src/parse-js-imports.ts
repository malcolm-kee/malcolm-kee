import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { init, parse as parseEsModule } from 'es-module-lexer';

export async function parseJsImports(
  jsSource: string,
  jsResourceUrl: string,
  options: { root: URL; excludes: Array<RegExp> }
): Promise<string[]> {
  await init();

  const output: string[] = [];

  try {
    const [imports] = parseEsModule(jsSource);

    for (const { specifier } of imports) {
      if (specifier) {
        const importedFilePath = new URL(specifier, new URL(jsResourceUrl, options.root));

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
