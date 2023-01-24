import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import fsP from 'fs-extra';

const root = path.resolve(__dirname, '..');
const mainWebsiteOutput = path.resolve(root, 'apps/v2/dist');
const target = path.resolve(root, 'public');

(async function mergeOutput() {
  assert(fs.existsSync(mainWebsiteOutput), 'Main website output not available');

  if (fs.existsSync(target)) {
    console.log('Remove previous output');
    await fsP.remove(target);
  }

  await fsP.copy(mainWebsiteOutput, target);
})();
