import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier/standalone';
import { describe, expect, test } from 'vitest';

import { compile } from './compilation';
import { formatCode } from './formatCode';
import { rewriteCompilerOutput } from './rewriteCompilerOutput';

/**
 * End-to-end fixture tests of the full pipeline used by the playground's
 * Output panel: compile -> prettier -> rewriteCompilerOutput -> prettier.
 *
 * Each `.tsx` file in __fixtures__ is compiled and snapshotted to a paired
 * `.snapshot.tsx` file. To add a case, drop a new `.tsx` file in the folder
 * and run `vitest -u`.
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, '__fixtures__');

const fixtures = readdirSync(fixturesDir)
  .filter((file) => file.endsWith('.tsx') && !file.includes('.snapshot.'))
  .map((file) => ({
    name: file.replace(/\.tsx$/, ''),
    inputPath: join(fixturesDir, file),
    snapshotPath: join(fixturesDir, file.replace(/\.tsx$/, '.snapshot.tsx')),
  }));

/**
 * Mirrors the formatting pipeline in components/Editor/Output.tsx so the
 * snapshot matches what users see in the editor. Prettier runs a second
 * time after `rewriteCompilerOutput` so any whitespace quirks from the
 * babel regeneration are normalized before the snapshot is written.
 */
async function formatForSnapshot(code: string): Promise<string> {
  const prettyCode = await formatCode(code, prettier);
  const rewritten = rewriteCompilerOutput(prettyCode);
  return formatCode(
    `// @ts-nocheck
${rewritten}`,
    prettier
  );
}

describe('compiler pipeline', () => {
  test.each(fixtures)('$name', async ({ inputPath, snapshotPath }) => {
    const source = readFileSync(inputPath, 'utf-8');

    const [output] = compile(source, 'compiler', '');

    expect(output.kind).toBe('ok');
    if (output.kind === 'ok') {
      const formatted = await formatForSnapshot(output.transformOutput.code);
      await expect(formatted).toMatchFileSnapshot(snapshotPath);
    }
  });
});
