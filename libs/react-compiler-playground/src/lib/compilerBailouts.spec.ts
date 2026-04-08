import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CompilerError } from 'babel-plugin-react-compiler';
import * as prettier from 'prettier/standalone';
import { describe, expect, test } from 'vitest';

import { compile } from './compilation';
import { formatCode } from './formatCode';
import { rewriteCompilerOutput } from './rewriteCompilerOutput';

/**
 * Companion to compilerPipeline.spec.ts focused on what the compiler does
 * *wrong* — or is forced to refuse — when given code that breaks the Rules
 * of React.
 *
 * Three categories of fixture live in __fixtures__/bailouts:
 *   1. Hard errors: the compiler refuses to emit any output. Snapshot is
 *      the error message.
 *   2. Silent skips: the compiler returns the function unchanged because
 *      it doesn't recognize it as a component. Snapshot is the input.
 *   3. Wrong optimizations: the compiler emits memoized code that hides
 *      a bug at runtime. Snapshot is the (buggy) compiled output.
 *
 * Each fixture's leading comment explains which category it belongs to and
 * why. To add a case, drop a `.tsx` file in the bailouts folder and run
 * `vitest -u`.
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, '__fixtures__', 'bailouts');

const fixtures = readdirSync(fixturesDir)
  .filter((file) => file.endsWith('.tsx') && !file.includes('.snapshot.'))
  .map((file) => ({
    name: file.replace(/\.tsx$/, ''),
    inputPath: join(fixturesDir, file),
    snapshotPath: join(fixturesDir, file.replace(/\.tsx$/, '.snapshot.tsx')),
  }));

async function formatForSnapshot(code: string): Promise<string> {
  const prettyCode = await formatCode(code, prettier);
  const rewritten = rewriteCompilerOutput(prettyCode);
  return formatCode(
    `// @ts-nocheck
${rewritten}`,
    prettier
  );
}

/**
 * Renders a compiler error as a tsx-shaped comment block so the snapshot
 * file is still parseable. The original error text is preserved verbatim
 * inside the comment for easy diffing.
 */
function formatErrorForSnapshot(errorText: string): string {
  const indented = indentAsJsDoc(errorText);
  return `// @ts-nocheck\n/**\n * Compiler bailed out — no code was emitted.\n *\n${indented}\n */\nexport {};\n`;
}

function indentAsJsDoc(text: string): string {
  return text
    .trimEnd()
    .split('\n')
    .map((line) => (line.length > 0 ? ` * ${line}` : ' *'))
    .join('\n');
}

/**
 * Runs the linter pass over a fixture and returns the aggregated error text
 * when the linter has anything to report. Returns `null` when the linter is
 * happy, so the caller can skip appending an empty comment.
 */
function runLinter(source: string): string | null {
  const [output] = compile(source, 'linter', '');
  if (output.kind === 'err') {
    return output.error.toString();
  }
  if (output.errors.length === 0) {
    return null;
  }
  const aggregate = new CompilerError();
  for (const detail of output.errors) {
    aggregate.details.push(detail);
  }
  return aggregate.toString();
}

function appendLintErrorsComment(snapshot: string, lintErrorText: string): string {
  const indented = indentAsJsDoc(lintErrorText);
  return `${snapshot.trimEnd()}\n\n/**\n * Linter reported:\n *\n${indented}\n */\n`;
}

describe('compiler bailouts', () => {
  test.each(fixtures)('$name', async ({ inputPath, snapshotPath }) => {
    const source = readFileSync(inputPath, 'utf-8');

    const [output] = compile(source, 'compiler', '');

    let formatted =
      output.kind === 'ok'
        ? await formatForSnapshot(output.transformOutput.code)
        : formatErrorForSnapshot(output.error.toString());

    const lintErrorText = runLinter(source);
    if (lintErrorText !== null) {
      formatted = appendLintErrorsComment(formatted, lintErrorText);
    }

    await expect(formatted).toMatchFileSnapshot(snapshotPath);
  });
});
