import { describe, expect, test } from 'vitest';
import { ErrorCategory } from 'babel-plugin-react-compiler';

import { compile } from './compilation';

describe('compile', () => {
  test('returns an err result for source with invalid syntax', () => {
    const source = `export default function Broken( {`;

    const [output] = compile(source, 'compiler', '');

    expect(output.kind).toBe('err');
    if (output.kind === 'err') {
      expect(output.error.hasErrors()).toBe(true);
      expect(output.results).toBeInstanceOf(Map);
    }
  });

  test('returns a Config error for invalid config overrides', () => {
    const source = `
export default function MyApp() {
  return <div>Hello World</div>;
}
`;
    const invalidConfig = '{ this is not valid json ';

    const [output, opts] = compile(source, 'compiler', invalidConfig);

    expect(output.kind).toBe('err');
    // When the config itself fails to parse, we never get as far as
    // building the full plugin options.
    expect(opts).toBeNull();
    if (output.kind === 'err') {
      const categories = output.error.details.map((detail) => detail.category);
      expect(categories).toContain(ErrorCategory.Config);
    }
  });

  test('honors JSON5 config overrides (comments and trailing commas)', () => {
    const source = `
export default function MyApp() {
  return <div>Hello World</div>;
}
`;
    // JSON5 allows comments and trailing commas — the playground uses JSON5
    // to parse the config editor contents.
    const config = `{
      // a comment
      compilationMode: 'infer',
    }`;

    const [output, opts] = compile(source, 'compiler', config);

    expect(output.kind).toBe('ok');
    expect(opts).not.toBeNull();
    expect(opts?.compilationMode).toBe('infer');
  });

  test('reports lint diagnostics when running in linter mode', () => {
    // setState inside render is a lint-only rule that the linter enables
    // via validateNoSetStateInRender.
    const source = `
import { useState } from 'react';

export default function BadComponent() {
  const [value, setValue] = useState(0);
  setValue(1);
  return <div>{value}</div>;
}
`;

    const [output] = compile(source, 'linter', '');

    expect(output.kind).toBe('err');
    if (output.kind === 'err') {
      expect(output.error.hasErrors()).toBe(true);
    }
  });
});
