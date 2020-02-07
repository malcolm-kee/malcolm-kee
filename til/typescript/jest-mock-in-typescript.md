---
title: 'Jest Mock in TypeScript'
date: '2020-02-07'
topics: ['typescript']
---

Writing tests in TypeScript in quite painful, especially when using mock.

```ts
import { readFile } from './fs-util';

jest.mock('./fs-util');

(readFile as jest.MockInstance).mockImplementation((path: string) => {
    ...
});
```

If you're using `ts-jest` (which you probably already are if you write your tests in TypeScript), it provides a `mocked` helper.

```ts
import { mocked } from 'ts-jest/utils'; // highlight-line
import { readFile } from './fs-util';

jest.mock('./fs-util');

// highlight-next-line
mocked(readFile).mockImplementation(path => {
    ...
});

```
