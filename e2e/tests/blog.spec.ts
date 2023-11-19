import { expect } from '@playwright/test';
import { test } from './base';

test('blog live editor is working', async ({ page }) => {
  await page.goto('/blog');

  await expect(
    page.getByText('My thoughts on technologies, books, or any other random topic.')
  ).toBeVisible();

  await page.getByText('React Portal to Subtree').click();

  await page.waitForTimeout(500);

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

test('save blog and view offline', async ({ page, context }) => {
  const serviceWorkerPromise = context.waitForEvent('serviceworker');
  await page.goto('/blog/');
  await serviceWorkerPromise;
  await page.getByText(/OpenAPI: A backend/).click();
  await expect(page.getByLabel('Contents').locator('visible=true')).toBeVisible();
  await page.waitForTimeout(500);
  await page.getByLabel('Save this page').locator('visible=true').click();
  await expect(page.getByLabel('Unsave this page').locator('visible=true')).toBeVisible();

  await context.route(/online/, (route) => route.abort());
  await context.setOffline(true);

  await page.goto('/about/');

  await expect(page.getByText('Disconnected')).toBeVisible();

  await page.getByText(/OpenAPI: A backend/).click();

  await expect(page.getByLabel('Contents').locator('visible=true')).toBeVisible();
});
