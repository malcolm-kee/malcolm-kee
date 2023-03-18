import { expect } from '@playwright/test';
import { test } from './base';

test('workshop live editor is working', async ({ page }) => {
  await page.goto('/workshop');

  await expect(page.getByText('Programming workshops')).toBeVisible();

  await page.getByText('JavaScript: The React Parts').click();

  await expect(page.getByText('Welcome to this workshop.')).toBeVisible();

  await page.getByLabel('Edit').locator('visible=true').click();

  await expect(page.getByRole('log')).toBeVisible();
});

test('workshop live editor accessibility', async ({ page, axe }) => {
  await page.goto('/workshop');

  await expect(page.getByText('Programming workshops')).toBeVisible();

  await page.getByText('JavaScript: The React Parts').click();

  await expect(page.getByText('Welcome to this workshop.')).toBeVisible();

  await page.getByLabel('Edit').locator('visible=true').click();

  await expect(page.getByRole('log')).toBeVisible();

  const result = await axe
    .disableRules(['color-contrast', 'scrollable-region-focusable'])
    .analyze();

  expect(result.violations).toEqual([]);
});
