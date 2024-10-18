import AxeBuilder from '@axe-core/playwright';
import { test as base } from '@playwright/test';

export const test = base.extend<{ axe: AxeBuilder }>({
  axe: [
    async ({ page }, use) => {
      const axe = new AxeBuilder({ page }).disableRules(['color-contrast']);

      await use(axe);
    },
    { scope: 'test' },
  ],
});
