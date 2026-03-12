import { describe, expect, test } from 'vitest';

import { parseJsImports } from './parse-js-imports';

const root = new URL('file:///project/dist/');

describe('parseJsImports', () => {
  test('extracts relative import paths', async () => {
    const js = `import { foo } from './utils.js';`;
    const result = await parseJsImports(js, '/js/main.js', { root, excludes: [] });

    expect(result).toEqual(['/js/utils.js']);
  });

  test('extracts multiple imports', async () => {
    const js = `
      import { foo } from './utils.js';
      import { bar } from './helpers.js';
    `;
    const result = await parseJsImports(js, '/js/main.js', { root, excludes: [] });

    expect(result).toEqual(['/js/utils.js', '/js/helpers.js']);
  });

  test('handles dynamic imports', async () => {
    const js = `const mod = import('./lazy.js');`;
    const result = await parseJsImports(js, '/js/main.js', { root, excludes: [] });

    expect(result).toEqual(['/js/lazy.js']);
  });

  test('applies exclude patterns', async () => {
    const js = `
      import { foo } from './utils.js';
      import { bar } from './excluded.js';
    `;
    const result = await parseJsImports(js, '/js/main.js', {
      root,
      excludes: [/excluded/],
    });

    expect(result).toEqual(['/js/utils.js']);
  });

  test('deduplicates imports', async () => {
    const js = `
      import { foo } from './utils.js';
      import { bar } from './utils.js';
    `;
    const result = await parseJsImports(js, '/js/main.js', { root, excludes: [] });

    expect(result).toEqual(['/js/utils.js']);
  });

  test('returns empty array for code without imports', async () => {
    const js = `console.log('no imports');`;
    const result = await parseJsImports(js, '/js/main.js', { root, excludes: [] });

    expect(result).toEqual([]);
  });

  test('handles parent directory imports', async () => {
    const js = `import { shared } from '../shared/lib.js';`;
    const result = await parseJsImports(js, '/js/nested/app.js', { root, excludes: [] });

    expect(result).toEqual(['/js/shared/lib.js']);
  });

  test('preserves absolute http URLs', async () => {
    const js = `import 'https://cdn.example.com/lib.js';`;
    const result = await parseJsImports(js, '/js/main.js', { root, excludes: [] });

    expect(result).toEqual(['https://cdn.example.com/lib.js']);
  });

  test('handles re-exports', async () => {
    const js = `export { foo } from './utils.js';`;
    const result = await parseJsImports(js, '/js/main.js', { root, excludes: [] });

    expect(result).toEqual(['/js/utils.js']);
  });
});
