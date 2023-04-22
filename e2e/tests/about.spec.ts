import { expect } from '@playwright/test';
import { test } from './base';

test('about page', async ({ page, axe }) => {
  await page.goto('/about');

  await expect(page.getByText('UI builder and tool creator')).toBeVisible();

  const result = await axe.analyze();

  expect(result.violations).toHaveLength(0);
});
