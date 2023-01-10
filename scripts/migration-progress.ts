import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

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

  if (currentLastLine && currentLastLine !== getResultComment(result)) {
    await fs.writeFile(
      reportFilePath,
      `${currentReportLines.filter(Boolean).join(os.EOL)}${os.EOL}${
        isResultComment(currentLastLine) ? '' : `${currentLastLine}${os.EOL}`
      }${result}${os.EOL}${os.EOL}${getResultComment(result)}`,
      'utf-8'
    );
  } else {
    console.log(`No update.`);
  }
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatPercent = (percent: number) => formatter.format(percent);

const now = new Date();
const getTodayDate = () =>
  new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

const startOfComment = '<!-- Last result: ';
const endOfComment = ' -->';

const getResultComment = (result: string) =>
  `${startOfComment}${result}${endOfComment}`;

const isResultComment = (text: string) =>
  text.startsWith(startOfComment) && text.endsWith(endOfComment);

migrationProgress();
