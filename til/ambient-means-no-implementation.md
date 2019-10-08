---
title: 'Ambient means No Implementation In TypeScript'
date: '2019-10-08'
topics: ['typescript']
---

Assuming you're writing a TypeScript code that depends on jquery available on global (included via `script` tag), how do you do that?

```ts
$('.btn').toggleClass('active'); // $ is undefined.
```

Use the `declare` keyword:

```ts
declare var $: any; // highlight-line
$('.btn').toggleClass('active'); // no more error
```

The `declare` keyword is known as ambient declaration, which means you declare the typing of a variable without implementation, and TypeScript will just assume you will somehow include that implementation yourself (via adding a `script` tag or inject via webpack, or whatever custom compiler you have).

The concept of ambient is not used within a file to declare a variable (like the `$` in the example above), it is also used in the context of ES Module and third-party packages.

## Declare the Typing of ES Module

A ES Module means a file that use `import` to specify its dependencies and `export` to specify what it expose.

For an example, you have the following ES Module (a file in your project):

```js fileName=src/math.js
export const sum = (a, b) => a + b;
```

To import it in TypeScript file, TypeScript gonna yell at you:

```js fileName=src/app.ts
import { sum } from './math'; // TypeScript Error: no declaration bla bla bla

console.log(sum(4, 5));
```

To fix it, create a `math.d.ts`:

```ts fileName=src/math.d.ts
export function sum(a: number, b: number): number;
```

And TypeScript will be happy now.

This `math.d.ts` file is known as "ambient module" (module without implementation). It is like the `declare` keyword: `declare` works for a variable within the file; `.d.ts` works for a module. When you name a file as `<something>.d.ts`, TypeScript will automatically associate it with the file `<something>.js`. Similar to `declare` keywords, TypeScript will assume your ambient declaration as accurate and assume you will implement it correctly.

## Declare Typing of Third Party Library

What about the third-party code in `node_modules` that is not TypeScript (i.e. all of them)?

Few possibilities:

1. The third-party package includes the typing itself (by providing an `index.d.ts` file at the root of the package, or specified using `types` in its `package.json`). In this case, TypeScript will able to associate the types without you doing any work.
1. The third-party

---

TO BE CONTINUED

---
