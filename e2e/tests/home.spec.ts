import { expect } from '@playwright/test';
import { test } from './base';

test('home page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText(/TOOL/)).toBeVisible();
});

test('home page accessibility', async ({ page, axe }) => {
  await page.goto('/');

  const result = await axe.analyze();

  expect(result.violations).toEqual([]);
});
