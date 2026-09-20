import { type SupportedLang } from './code-sandbox-helpers';

export function addReactImportIfNeeded(
  codeLines: Array<string>,
  language: SupportedLang,
  dependencies: Record<string, string>
) {
  const needsReactImport =
    (language === 'jsx' || language === 'tsx') &&
    !dependencies.react &&
    !codeLines.some((line) => reactBindingImportPattern.test(line));

  if (needsReactImport) {
    codeLines.unshift(`import * as React from 'react';`);
  }
}

const reactBindingImportPattern =
  /^\s*import\s+(?:\*\s+as\s+React\b|React\b.*)\s+from\s+['"]react['"]/;
