---
title: 'Jest Mock in TypeScript'
pubDate: 7 Feb 2020
topics: ['typescript']
---

Writing tests in TypeScript in quite painful, especially when using mock.

```ts
import { readFile } from './fs-util';

jest.mock('./fs-util');

(readFile as jest.MockInstance).mockImplementation((path: string) => {
  // mock implementation
});
```

If you're using `ts-jest` (which you probably already are if you write your tests in TypeScript), it provides a `mocked` helper.

```ts {0,5}
import { mocked } from 'ts-jest/utils';
import { readFile } from './fs-util';

jest.mock('./fs-util');

mocked(readFile).mockImplementation((path) => {
  // mock implementation
});
```
