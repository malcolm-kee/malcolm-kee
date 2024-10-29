import { test, expect } from 'vitest';

import { getCodeWalkthroughSectionIndex } from './code-walkthrough-helpers';

test('getCodeWalkthroughSectionIndex', () => {
  expect(getCodeWalkthroughSectionIndex(0, [2, 5, 7])).toBe(0);
  expect(getCodeWalkthroughSectionIndex(1, [2, 5, 7])).toBe(0);
  expect(getCodeWalkthroughSectionIndex(2, [2, 5, 7])).toBe(-1);
  expect(getCodeWalkthroughSectionIndex(3, [2, 5, 7])).toBe(1);
  expect(getCodeWalkthroughSectionIndex(8, [2, 5, 7])).toBe(3);
});
