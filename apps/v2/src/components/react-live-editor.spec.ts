import { describe, expect, test } from 'vitest';
import { addReactImportIfNeeded } from './react-live-editor-helpers';

describe('addReactImportIfNeeded', () => {
  test('adds a React import to JSX that has none', () => {
    const codeLines = ['export function App() {', '  return <main>Hello</main>;', '}'];

    addReactImportIfNeeded(codeLines, 'jsx', {});

    expect(codeLines[0]).toBe(`import * as React from 'react';`);
  });

  test('does not duplicate an existing React namespace import', () => {
    const codeLines = [
      `import * as React from 'react';`,
      '',
      'export function App() {',
      '  return <main>Hello</main>;',
      '}',
    ];

    addReactImportIfNeeded(codeLines, 'jsx', {});

    expect(codeLines.filter((line) => line === `import * as React from 'react';`)).toHaveLength(1);
  });

  test('does not conflict with an existing default React import', () => {
    const codeLines = [`import React from "react";`, 'export const App = () => <main />;'];

    addReactImportIfNeeded(codeLines, 'tsx', {});

    expect(codeLines).toEqual([`import React from "react";`, 'export const App = () => <main />;']);
  });

  test('is idempotent when source normalization runs more than once', () => {
    const codeLines = ['export const App = () => <main />;'];

    addReactImportIfNeeded(codeLines, 'jsx', {});
    addReactImportIfNeeded(codeLines, 'jsx', {});

    expect(codeLines.filter((line) => line === `import * as React from 'react';`)).toHaveLength(1);
  });
});
