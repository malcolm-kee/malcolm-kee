const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const profileImage = fs
  .readFileSync(
    path.resolve(__dirname, '..', 'src', 'assets', 'malcolm-in-cpg.jpg')
  )
  .toString('base64');

async function screenshot() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setViewport({ width: 1200, height: 628 });
  console.log(`starting...`);

  const htmlTemplate = fs.readFileSync(
    path.resolve(__dirname, 'template.html'),
    'utf8'
  );

  const html = htmlTemplate
    .replace(
      '{{ title }}',
      'There is no way to type "as" props properly in TypeScript currently'
    )
    .replace('{{ imgData }}', profileImage)
    .replace('{{ date }}', 'Sep 29, 2019');

  await page.setContent(html);
  await page.screenshot({ path: './hello.png' });
  console.log('Done!');
  browser.close();
}

screenshot();
