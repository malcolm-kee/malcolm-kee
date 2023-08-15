import { existsSync as fsExists } from 'node:fs';
import fs from 'node:fs/promises';
import process from 'node:process';
import repl from 'node:repl';

import * as lox from './lox';

const args = process.argv.slice(2);

if (args.length > 1) {
  console.error('Usage: lox [script]');
  process.exit(1);
}

if (args.length === 1) {
  runScript(args[0]);
} else {
  runRepl();
}

async function runScript(scriptPath: string) {
  if (fsExists(scriptPath)) {
    const source = await fs.readFile(scriptPath, { encoding: 'utf-8' });

    lox.run(source);
  } else {
    console.error(`'${scriptPath}' does not exists.`);
    process.exit(1);
  }
}

function runRepl() {
  repl.start({
    prompt: 'lox => ',
    eval: (uInput) => {
      lox.run(uInput);
    },
  });
}
