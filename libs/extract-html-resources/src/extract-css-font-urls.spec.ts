import { describe, expect, test } from 'vitest';

import { extractCssFontUrls } from './extract-css-font-urls';

describe('extractCssFontUrls', () => {
  test('extracts font URLs from @font-face src', async () => {
    const css = `
      @font-face {
        font-family: 'CustomFont';
        src: url('/fonts/custom.woff2') format('woff2'),
             url('/fonts/custom.woff') format('woff');
      }
    `;
    const result = await extractCssFontUrls(css);

    expect(result).toEqual(['/fonts/custom.woff2', '/fonts/custom.woff']);
  });

  test('extracts font URLs with double quotes', async () => {
    const css = `
      @font-face {
        font-family: 'MyFont';
        src: url("/fonts/my-font.ttf");
      }
    `;
    const result = await extractCssFontUrls(css);

    expect(result).toEqual(['/fonts/my-font.ttf']);
  });

  test('extracts font URLs without quotes', async () => {
    const css = `
      @font-face {
        font-family: 'NoQuotes';
        src: url(/fonts/noquotes.woff2);
      }
    `;
    const result = await extractCssFontUrls(css);

    expect(result).toEqual(['/fonts/noquotes.woff2']);
  });

  test('returns empty array when no @font-face rules', async () => {
    const css = `
      body { font-family: sans-serif; }
      .header { background: url('/images/bg.png'); }
    `;
    const result = await extractCssFontUrls(css);

    expect(result).toEqual([]);
  });

  test('ignores @font-face without src declaration', async () => {
    const css = `
      @font-face {
        font-family: 'NoSrc';
        font-weight: bold;
      }
    `;
    const result = await extractCssFontUrls(css);

    expect(result).toEqual([]);
  });

  test('handles multiple @font-face rules', async () => {
    const css = `
      @font-face {
        font-family: 'FontA';
        src: url('/fonts/a.woff2');
      }
      @font-face {
        font-family: 'FontB';
        src: url('/fonts/b.woff2');
      }
    `;
    const result = await extractCssFontUrls(css);

    expect(result).toEqual(['/fonts/a.woff2', '/fonts/b.woff2']);
  });

  test('handles absolute URLs', async () => {
    const css = `
      @font-face {
        font-family: 'CDNFont';
        src: url('https://fonts.example.com/font.woff2');
      }
    `;
    const result = await extractCssFontUrls(css);

    expect(result).toEqual(['https://fonts.example.com/font.woff2']);
  });
});
