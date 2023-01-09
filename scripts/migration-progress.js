const { execSync } = require('node:child_process');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const reportFilePath = path.resolve(root, 'migration-progress.md');
const archiveDir = path.resolve(root, 'apps/archive');
const initialCount = 521;

const newLineRegex = /\r\n|\r|\n/;

async function migrationProgress() {
  const lsFileResult = execSync(`git ls-files`, {
    encoding: 'utf-8',
    cwd: archiveDir,
  });

  const currentFileCount = lsFileResult.trim().split(newLineRegex).length;

  const migratedCount = initialCount - currentFileCount;

  const completePercentage = migratedCount / initialCount;

  const result = `| ${getTodayDate()} | ${formatPercent(
    completePercentage
  )} (${migratedCount}/${initialCount}) |`;

  const currentReportLines = (await fs.readFile(reportFilePath, 'utf-8'))
    .trim()
    .split(newLineRegex);

  const currentLastLine = currentReportLines.pop();

  if (currentLastLine !== getResultComment(result)) {
    await fs.writeFile(
      reportFilePath,
      `${currentReportLines.filter(Boolean).join(os.EOL)}${os.EOL}${
        isResultComment(currentLastLine) ? '' : `${currentLastLine}${os.EOL}`
      }${result}${os.EOL}${os.EOL}${getResultComment(result)}`,
      'utf-8'
    );
  }
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
/**
 *
 * @param {number} percent
 */
const formatPercent = (percent) => formatter.format(percent);

const now = new Date();
const getTodayDate = () =>
  new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

const startOfComment = '<!-- Last result: ';
const endOfComment = ' -->';

/**
 *
 * @param {string} result
 */
const getResultComment = (result) =>
  `${startOfComment}${result}${endOfComment}`;

/**
 *
 * @param {string} text
 */
const isResultComment = (text) =>
  text.startsWith(startOfComment) && text.endsWith(endOfComment);

migrationProgress();
