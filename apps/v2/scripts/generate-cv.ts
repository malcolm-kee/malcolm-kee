import { chromium } from 'playwright';
import { fileName } from '../src/data/cv';

(async function generateCv() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8989/cv');
  await page.pdf({ path: `dist/${fileName}` });
  await browser.close();
})();
