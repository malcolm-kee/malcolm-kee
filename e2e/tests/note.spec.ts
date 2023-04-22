import { expect } from '@playwright/test';
import { test } from './base';

test('note page', async ({ page, axe }) => {
  await page.goto('/note');

  await expect(page.getByText('Docker Swarm')).toBeVisible();

  await page.getByText('Docker Swarm').click();

  const result = await axe.analyze();

  expect(result.violations).toHaveLength(0);
});
