import { includes } from '@mkee/helpers';
import { init, parse } from 'es-module-lexer';
import { transformSync, type Loader } from 'esbuild';
import type { ShikiTransformer } from 'shiki';

const languagesToParse = ['js', 'jsx', 'ts', 'tsx'] satisfies ReadonlyArray<Loader>;

const symbol = Symbol('code-imports');

/**
 * Include packages that are imported in the code block as data attribute so it can be
 * used by ReactLiveEditor to include dependencies
 */
export const codeImportTransformer = async (): Promise<ShikiTransformer> => {
  await init;
  return {
    name: 'malcolm-code-imports',
    preprocess(code, { lang }) {
      if (includes(languagesToParse, lang)) {
        const transformResult = transformSync(code, {
          format: 'esm',
          loader: lang,
          target: 'es2020',
        });

        const [codeImports] = parse(transformResult.code);

        const importedPkgs = new Set<string>();

        codeImports.forEach(({ n }) => {
          if (n) {
            // extract out npm package name, as it's possible that
            // there are relative imports
            const match = n.match(/^((@[\w|-]+\/)?[\w|.-]+)/);

            if (match && match[1] !== '.') {
              importedPkgs.add(match[1]);
            }
          }
        });

        if (importedPkgs.size > 0) {
          this.meta[symbol] = Array.from(importedPkgs);
        }
      }
    },
    code(element) {
      const importedPkgs = this.meta[symbol];

      if (Array.isArray(importedPkgs)) {
        element.properties['data-code-imports'] = importedPkgs.join(',');
      }

      return element;
    },
  };
};
