import { codeToHtml } from 'shiki';
import { describe, expect, test } from 'vitest';
import { codeImportTransformer } from './code-import-plugins';

describe('codeImportTransformer', () => {
  test('serializes bare package imports for the live editor', async () => {
    const html = await codeToHtml(
      [
        `import * as React from 'react';`,
        `import { createRoot } from 'react-dom/client';`,
        `import { Link } from 'react-router-dom';`,
      ].join('\n'),
      {
        lang: 'jsx',
        themes: { light: 'github-light', dark: 'night-owl' },
        transformers: [await codeImportTransformer()],
      }
    );

    expect(html).toContain('data-code-imports="react,react-dom,react-router-dom"');
  });
});
