/**
 * @overview These two remark and rehype code plugin must be used together.
 *
 * - remarkCodeImportPlugin will parse all the js, jsx, ts, and tsx code and extract packages that are
 *   imported to the code, which will be assigned to the virtual file data property
 *
 * - rehypeCodeImportPlugin will then use the packages value to assign to `data-code-imports` of the
 *   associated <pre> element, which will be used by `LiveEditor` component to know what third-party
 *   dependencies must be included.
 */

import { init, parse } from 'es-module-lexer';
import { initialize, transformSync, type Loader } from 'esbuild';
import type { Root as HastRoot } from 'hast';
import type { Root as MdastRoot } from 'mdast';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

type ImportData = Record<number, Array<string>>;

const languagesToParse = ['js', 'jsx', 'ts', 'tsx'] satisfies ReadonlyArray<Loader>;
const dataKey = 'malcolm-code-imports';

const esbuildInitialized = initialize({});

export const remarkCodeImportPlugin = (): Transformer<MdastRoot> => {
  return async function transformer(tree, file) {
    await esbuildInitialized;
    await init;
    let codeIndex = 0;

    visit(tree, 'code', function visitor(codeNode, _, parent) {
      const { lang, value } = codeNode;

      if (
        parent &&
        // @ts-expect-error
        parent.type === 'mdxJsxFlowElement' &&
        // @ts-expect-error
        parent.name === 'LiveEditor' &&
        lang &&
        // @ts-expect-error
        languagesToParse.includes(lang)
      ) {
        try {
          const transformResult = transformSync(value, {
            format: 'esm',
            // @ts-expect-error
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

              if (match) {
                importedPkgs.add(match[1]);
              }
            }
          });

          if (importedPkgs.size > 0) {
            const importData: ImportData = (file.data[dataKey] || {}) as ImportData;
            importData[codeIndex] = Array.from(importedPkgs);
            file.data[dataKey] = importData;
          }
        } catch (error) {
          console.group(`Error while parsing code snippet`);
          console.error(error);
          console.log(value);
          console.groupEnd();
        }
      }

      codeIndex++;
    });
  };
};

export const rehypeCodeImportPlugin = (): Transformer<HastRoot> => {
  return async function transformer(tree, file) {
    let codeIndex = 0;
    visit(tree, 'element', function visitor(element) {
      if (element.tagName === 'pre') {
        const codeDataIndex = Math.floor(codeIndex / 2);
        // because remark shiki renders 2 pre tag for each code block
        const importData = ((file.data[dataKey] || {}) as ImportData)[codeDataIndex];

        if (importData) {
          const properties = element.properties || {};
          properties['data-code-imports'] = importData.join(',');
          element.properties = properties;
        }

        codeIndex++;
      }
    });
  };
};
