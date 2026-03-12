import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';

import { extractDependencies } from './extract-dependencies';

const fixturesDir = path.resolve(import.meta.dirname, '__fixtures__');

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('extractDependencies', () => {
  test('extracts all resource types from a basic HTML file', async () => {
    server.use(
      http.get('https://cdn.example.com/lib.js', () => {
        return new HttpResponse('export default 42;', {
          headers: { 'content-type': 'application/javascript' },
        });
      })
    );

    const root = pathToFileURL(path.join(fixturesDir, 'basic') + '/');
    const result = await extractDependencies(new URL('basic.html', pathToFileURL(fixturesDir + '/')), {
      root,
      excludes: [],
    });

    expect(result.css).toEqual(new Set(['/styles/main.css', '/styles/theme.css']));
    expect(result.js).toContain('/js/app.js');
    expect(result.js).toContain('/js/analytics.js');
    expect(result.js).toContain('https://cdn.example.com/lib.js');
    expect(result.images).toEqual(new Set(['/images/logo.png', '/images/hero.jpg']));
  });

  test('extracts astro-island resources', async () => {
    const root = pathToFileURL(path.join(fixturesDir, 'astro') + '/');
    const result = await extractDependencies(new URL('astro.html', pathToFileURL(fixturesDir + '/')), {
      root,
      excludes: [],
    });

    expect(result.js).toContain('/components/Counter.js');
    expect(result.js).toContain('/renderers/react.js');
    expect(result.js).toContain('/components/Nav.js');
    expect(result.css).toEqual(new Set(['/styles/astro.css']));
  });

  test('follows CSS and JS dependencies from fixture files', async () => {
    const root = pathToFileURL(path.join(fixturesDir, 'with-deps') + '/');
    const result = await extractDependencies(new URL('index.html', root), {
      root,
      excludes: [],
    });

    expect(result.css).toEqual(new Set(['/styles/fonts.css']));
    expect(result.fonts).toContain('/fonts/custom.woff2');
    expect(result.fonts).toContain('/fonts/custom.woff');
    expect(result.js).toContain('/js/main.js');
    expect(result.js).toContain('/js/utils.js');
    expect(result.js).toContain('/js/render.js');
    expect(result.images).toEqual(new Set(['/images/photo.webp']));
  });

  test('applies excludes pattern', async () => {
    const root = pathToFileURL(path.join(fixturesDir, 'with-deps') + '/');
    const result = await extractDependencies(new URL('index.html', root), {
      root,
      excludes: [/utils/],
    });

    expect(result.js).toContain('/js/main.js');
    expect(result.js).not.toContain('/js/utils.js');
  });

  test('fetches external JS resources via HTTP', async () => {
    server.use(
      http.get('https://cdn.example.com/lib.js', () => {
        return new HttpResponse(`import 'https://cdn.example.com/dep.js';`, {
          headers: { 'content-type': 'application/javascript' },
        });
      }),
      http.get('https://cdn.example.com/dep.js', () => {
        return new HttpResponse('export const x = 1;', {
          headers: { 'content-type': 'application/javascript' },
        });
      })
    );

    const root = pathToFileURL(path.join(fixturesDir, 'basic') + '/');
    const result = await extractDependencies(new URL('basic.html', pathToFileURL(fixturesDir + '/')), {
      root,
      excludes: [],
    });

    expect(result.js).toContain('https://cdn.example.com/lib.js');
    expect(result.js).toContain('https://cdn.example.com/dep.js');
  });

  test('skips external resources that return text/html', async () => {
    server.use(
      http.get('https://cdn.example.com/lib.js', () => {
        return new HttpResponse('<html>not found</html>', {
          headers: { 'content-type': 'text/html' },
        });
      })
    );

    const root = pathToFileURL(path.join(fixturesDir, 'basic') + '/');
    const result = await extractDependencies(new URL('basic.html', pathToFileURL(fixturesDir + '/')), {
      root,
      excludes: [],
    });

    // The resource is still listed (found in HTML), but its deps are not followed
    expect(result.js).toContain('https://cdn.example.com/lib.js');
  });
});
