---
title: Test Framework
description: 'Understand the basic building blocks of test framework: test runner and assertion'
date: '2020-01-26'
objectives:
  - understand the concept of test runner by writing a simple version from scratch
  - understand the concept of assertion by writing a simple version from scratch
---

Before we dive into how to write a test, let's discuss what tools are required for us to have automated tests.

## Test Runner

The first tool that we need is test runner. A test runner is a uility that allows you to declare your test, which will be executed and the result of the test will be displayed.

Consider the following code:

```js
const add = (a, b) => a + b;
```

Let's write a test for it. What is a test? _A test is a piece of code that throws error when your code does not behave as expected._

```js live
const add = (a, b) => a + b;

function testAdd() {
  const result = add(1, 2);
  const expected = 3;
  if (result !== expected) {
    throw new Error(`${result} is not equal to ${expected}`);
  }
}

function testAddMinus() {
  const result = add(100, -50);
  const expected = 50;
  if (result !== expected) {
    throw new Error(`${result} is not equal to ${expected}`);
  }
}

try {
  testAdd();
  console.log('✔ test pass');
} catch (e) {
  console.error('❌ test fail');
  console.error(e);
}

try {
  testAddMinus();
  console.log('✔ test pass');
} catch (e) {
  console.error('❌ test fail');
  console.error(e);
}
```

<aside>

Change the `add` function to make the test fail and verify the error is shown.

</aside>

As you may already realize, the message now is not very helpful, and there is many duplication in our code, let's create a utility `test` function:

```js live
const add = (a, b) => a + b;

function test(testName, executeTest) {
  try {
    executeTest();
    console.log(`✔ ${testName}`);
  } catch (e) {
    console.error(`❌ ${testName}`);
    console.error(e);
  }
}

test('add 1 and 2 equals 3', () => {
  const result = add(1, 2);
  const expected = 3;
  if (result !== expected) {
    throw new Error(`${result} is not equal to ${expected}`);
  }
});

test('add 100 and -50 equals 50', () => {
  const result = add(100, -50);
  const expected = 50;
  if (result !== expected) {
    throw new Error(`${result} is not equal to ${expected}`);
  }
});
```

The `test` utility function allows us to declare a test, which will be executed and log the result to console.

## Assertion

Note that we still have some duplication of the `result` and `expected`, we can write a `expect` utility function to make it more readable:

```js live
const add = (a, b) => a + b;

function test(testName, executeTest) {
  try {
    executeTest();
    console.log(`✔ ${testName}`);
  } catch (e) {
    console.error(`❌ ${testName}`);
    console.error(e);
  }
}

function expect(result) {
  return {
    toBe(expected) {
      if (result !== expected) {
        throw new Error(`${result} is not equal to ${expected}`);
      }
    },
  };
}

test('add 1 and 2 equals 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('add 100 and -50 equals 50', () => {
  expect(add(100, -50)).toBe(50);
});
```

The `expect` utility that we have just created is known as assertion utility. An assertion utility helps us to make comparison and throw error when the comparisons is not expected.

## Next Step

Test runner and assertion utility are already included as part of Jest. We'll use Jest to write tests for our application in next section.
