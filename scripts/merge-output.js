const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const fsP = require('fs-extra');

const root = path.resolve(__dirname, '..');
const mainWebsiteOutput = path.resolve(root, 'apps/v2/dist');
const archiveOutput = path.resolve(root, 'apps/archive/public');
const target = path.resolve(root, 'public');

(async function mergeOutput() {
  assert(fs.existsSync(mainWebsiteOutput), 'Main website output not available');
  assert(fs.existsSync(archiveOutput), 'Archive output not available');

  if (fs.existsSync(target)) {
    console.log('Remove previous output');
    await fsP.remove(target);
  }

  await fsP.copy(mainWebsiteOutput, target);
  await fsP.copy(archiveOutput, path.resolve(target, 'archive'));
})();
