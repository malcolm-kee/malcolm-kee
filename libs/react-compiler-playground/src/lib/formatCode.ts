import type prettier from 'prettier';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import parserBabel from 'prettier/plugins/babel';

export const formatCode = (code: string, p: Pick<typeof prettier, 'format'>) =>
  p.format(code, {
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    parser: 'babel-ts',
    printWidth: 60,
    plugins: [parserBabel, prettierPluginEstree],
  });
