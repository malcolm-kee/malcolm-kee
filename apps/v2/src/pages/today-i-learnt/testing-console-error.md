---
title: 'Assert console.error call times when mocking it'
date: 17 Dec 2019
topics: ['javascript']
layout: ../../layouts/TodayILearnt.astro
---

Sometimes, when you testing edge cases of your code that cause error, the code/frameworks that you use may call `console.error`. A common case that I encounter is testing [error boundary](https://reactjs.org/docs/error-boundaries.html) in React.

The `console.error` is trying to be helpful, however when the error is expected in the tests, the long call stack is cluttering the log, which may cause us miss out important warning/message.

To fix that, the common approach is to mock the `console.error` call.

```js
beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  global.console.error.mockRestore();
});
```

However, this approach has a downside: if there is any error logged during the test, you can't see the error at all.

To make sure that will not happen, the closest thing you can do is to assert how many the console method has been called.

```js
beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  global.console.error.mockRestore();
});

test('my test case title', () => {
  // the tests
  expect(console.error).toHaveBeenCallTimes(2); // highlight-line
});
```

Then if there is any error logged that is not expected, at least the tests will catch it.
