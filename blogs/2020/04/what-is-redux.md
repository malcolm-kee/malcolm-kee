---
title: What is Redux?
date: '2020-04-04'
published: false 
---

There are many ways to understand a programming concept.

It can be by example, it can be by definition, or it can be by metaphor.

In this post, I would like to explain redux using metaphor.

---

To understand redux as a metaphor, let's understand two programming concepts that are easier to understand than redux: `Array.reduce` and event bus.

## Array.reduce

`Array.reduce` is one of the built-in methods on all Arrays in JavaScript.

It's used to "reduce" a single value from all the items of the array.

Consider the following example:

```js live
const numbers = [1, 2, 3, 4, 5];

const total = numbers.reduce((result, item) => result + item, 0);

console.log('total: ' + total);
```

`Array.reduce` accepts two parameters, a reducer function and initial value.

- the reducer function accepts two parameters as well: accumulator and item. Accumulator is the value that will be used to "accumulate" the final value of `Array.reduce`.
- the initial value will be used as the "accumulator" when reducer function is called for the first item.

How it works is

1. the reducer function will be called with initial value as accumulator and the first item as the second parameter.

1. the returns value of the first call will be passed as the accumulator with second item as the second parameter. This will continues until the last item.

1. At the last call of reducer function (where the item is the last item of the array), the returned value of the reducer will become the final result.

Let's walkthrough the previous example:

<div class="pre-bordered-table" />

| accumulator | item | result | remarks                                  |
| ----------- | ---- | ------ | ---------------------------------------- |
| 0           | 1    | 1      | accumulator = 2nd parameter of `.reduce` |
| 1           | 2    | 3      | |
| 3           | 3    | 6      | |
| 6           | 4    | 10     | |
| 10          | 5    | 15     | no more item, so 15 becomes final result |

## Event Bus

An event bus 

To be continued...
