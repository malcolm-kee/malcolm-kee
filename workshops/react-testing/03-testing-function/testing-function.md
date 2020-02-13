---
title: Testing function
description: 'Test the behavior of a pure function'
date: '2020-02-13'
objectives:
  - write tests for pure function in Jest
  - use assertion provided by Jest
---

In last section, we create our own wrapper to test function.

In this section, we will starts to write unit tests for pure function using Jest.

## Creating a first test

Create a file in `src` folder and name it `canary.spec.js` with the following content:

```js fileName=src/canary.spec.js
test(`canary test`, () => {
  expect(true).toBe(true);
});
```

Run the following command in your command line:

```bash
npm run test
```
