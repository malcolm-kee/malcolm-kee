import { expect } from '@playwright/test';
import { test } from './base';

test('blog live editor is working', async ({ page }) => {
  await page.goto('/blog');

  await expect(
    page.getByText('My thoughts on technologies, books, or any other random topic.')
  ).toBeVisible();

  await page.getByText('React Portal to Subtree').click();

  await page.getByLabel('Edit').locator('visible=true').click();

  const preview = page.frameLocator('[title="Sandpack Preview"]');

  await preview.getByText('Show Page 1').click();
  await expect(preview.locator('h2')).toHaveText('Page 1');

  await preview.getByText('Show Page 2').click();
  await expect(preview.locator('h2')).toHaveText('Page 2');
});

test('blog live editor accessibility', async ({ page, axe }) => {
  await page.goto('/blog');
  await page.getByText('React Portal to Subtree').click();

  await page.getByLabel('Edit').locator('visible=true').click();

  const result = await axe
    .disableRules(['color-contrast', 'scrollable-region-focusable'])
    .analyze();

  expect(result.violations).toEqual([]);
});
