import { describe, expect, test } from 'vitest';

import { parseHtmlResources } from './parse-html-resources';

describe('parseHtmlResources', () => {
  test('extracts script src attributes', () => {
    const html = `<script src="/js/app.js"></script><script src="/js/vendor.js"></script>`;
    const result = parseHtmlResources(html, { excludes: [] });

    expect(result.js).toEqual(new Set(['/js/app.js', '/js/vendor.js']));
  });

  test('extracts stylesheet link hrefs', () => {
    const html = `
      <link rel="stylesheet" href="/styles/main.css">
      <link rel="stylesheet" href="/styles/theme.css">
    `;
    const result = parseHtmlResources(html, { excludes: [] });

    expect(result.css).toEqual(new Set(['/styles/main.css', '/styles/theme.css']));
  });

  test('ignores non-stylesheet links', () => {
    const html = `
      <link rel="icon" href="/favicon.ico">
      <link rel="preload" href="/font.woff2">
    `;
    const result = parseHtmlResources(html, { excludes: [] });

    expect(result.css).toEqual(new Set());
  });

  test('extracts img src attributes', () => {
    const html = `<img src="/images/logo.png"><img src="/images/hero.jpg">`;
    const result = parseHtmlResources(html, { excludes: [] });

    expect(result.images).toEqual(new Set(['/images/logo.png', '/images/hero.jpg']));
  });

  test('extracts astro-island component-url and renderer-url', () => {
    const html = `
      <astro-island component-url="/components/Counter.js" renderer-url="/renderers/react.js"></astro-island>
      <astro-island component-url="/components/Nav.js"></astro-island>
    `;
    const result = parseHtmlResources(html, { excludes: [] });

    expect(result.js).toEqual(
      new Set(['/components/Counter.js', '/renderers/react.js', '/components/Nav.js'])
    );
  });

  test('applies excludes to script src', () => {
    const html = `
      <script src="/js/app.js"></script>
      <script src="https://www.googletagmanager.com/gtag.js"></script>
    `;
    const result = parseHtmlResources(html, {
      excludes: [/^https:\/\/www\.googletagmanager\.com/],
    });

    expect(result.js).toEqual(new Set(['/js/app.js']));
  });

  test('applies excludes to stylesheet hrefs', () => {
    const html = `
      <link rel="stylesheet" href="/styles/main.css">
      <link rel="stylesheet" href="https://cdn.example.com/external.css">
    `;
    const result = parseHtmlResources(html, {
      excludes: [/^https:\/\/cdn\.example\.com/],
    });

    expect(result.css).toEqual(new Set(['/styles/main.css']));
  });

  test('applies excludes to img src', () => {
    const html = `
      <img src="/images/logo.png">
      <img src="https://tracking.example.com/pixel.gif">
    `;
    const result = parseHtmlResources(html, {
      excludes: [/^https:\/\/tracking\.example\.com/],
    });

    expect(result.images).toEqual(new Set(['/images/logo.png']));
  });

  test('ignores script tags without src', () => {
    const html = `<script>console.log("inline")</script>`;
    const result = parseHtmlResources(html, { excludes: [] });

    expect(result.js).toEqual(new Set());
  });

  test('ignores img tags without src', () => {
    const html = `<img alt="no source">`;
    const result = parseHtmlResources(html, { excludes: [] });

    expect(result.images).toEqual(new Set());
  });

  test('deduplicates resources', () => {
    const html = `
      <script src="/js/app.js"></script>
      <script src="/js/app.js"></script>
    `;
    const result = parseHtmlResources(html, { excludes: [] });

    expect(result.js).toEqual(new Set(['/js/app.js']));
    expect(result.js.size).toBe(1);
  });

  test('extracts all resource types from a full HTML page', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="/styles/main.css">
        <script src="/js/app.js"></script>
      </head>
      <body>
        <img src="/images/logo.png">
        <astro-island component-url="/components/Widget.js" renderer-url="/renderers/preact.js"></astro-island>
        <script src="/js/extra.js"></script>
      </body>
      </html>
    `;
    const result = parseHtmlResources(html, { excludes: [] });

    expect(result.css).toEqual(new Set(['/styles/main.css']));
    expect(result.js).toEqual(
      new Set(['/js/app.js', '/components/Widget.js', '/renderers/preact.js', '/js/extra.js'])
    );
    expect(result.images).toEqual(new Set(['/images/logo.png']));
    expect(result.fonts).toEqual(new Set());
  });
});
