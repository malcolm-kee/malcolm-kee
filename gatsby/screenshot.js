const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const profileImage = fs
  .readFileSync(
    path.resolve(__dirname, '..', 'src', 'assets', 'malcolm-in-cpg.jpg')
  )
  .toString('base64');

exports.screenshot = async function screenshot(
  { nodes, reporter },
  { template }
) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 628 });

  const htmlTemplate = fs.readFileSync(template, 'utf8');

  for (const node of nodes) {
    const { title, date, slug, subtitle, icon } = node;
    const filePath = path.resolve(`public/og_image/${slug}.png`);
    ensureDirectoryExistence(filePath);

    if (fs.existsSync(filePath)) continue;

    try {
      const html = htmlTemplate
        .replace('{{ title }}', title || '')
        .replace('{{ imgData }}', profileImage)
        .replace('{{ subtitle }}', subtitle || '')
        .replace('{{ date }}', date || '')
        .replace(
          'icon-src',
          (icon &&
            icon.absolutePath &&
            `data:image/${icon.extension};base64,${fs
              .readFileSync(icon.absolutePath)
              .toString('base64')}`) ||
            ''
        );

      await page.setContent(html);
      await page.screenshot({ path: filePath });
      reporter.log(`Generated ${filePath}`);
    } catch (e) {
      reporter.error(e);
    }
  }

  await browser.close();
};

let seenDirName = '';
function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (dirname === seenDirName) return; // short circuit if seen
  seenDirName = dirname; // set seen
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
