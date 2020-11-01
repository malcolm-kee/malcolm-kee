---
title: 'Ambient means No Implementation In TypeScript'
date: '2019-10-08'
topics: ['typescript']
---

## References

I learnt the concept of "ambient" in TypeScript from these two references. Read them if you wish, or just read my understanding below.

- [This GitHub issue comment provides a definition of "ambient" in TypeScript](https://github.com/Microsoft/TypeScript-Handbook/issues/180#issuecomment-195452691)
- [Typescript ambient module declarations](https://www.mourtada.se/typescript-ambient-module-declarations/)

## Ambient Variable Declaration

Assuming you're writing a TypeScript code that depends on jquery available on global (included via `script` tag), how do you do that?

```ts noWrapper
$('.btn').toggleClass('active'); // Cannot find name '$'.
```

Use the `declare` keyword:

```ts noWrapper
declare var $: any; // highlight-line
$('.btn').toggleClass('active'); // no more error
```

The `declare` keyword is known as *ambient declaration*, which means you declare the typing of a variable without implementation, and TypeScript will just assume you will somehow include that implementation yourself (via adding a `script` tag or inject via webpack, or whatever custom compiler you have).

The concept of ambient is not used within a file to declare a variable (like the `$` in the example above), it is also used in the context of ES Module and third-party packages.

Let's look at them.

## Declare the Typing of ES Module

A ES Module is just a fancy way to describe a JavaScript file that use `import` to specify its dependencies and `export` to specify what it expose.

For an example, you have the following ES Module (a file in your project):

```js fileName=src/math.js
export const sum = (a, b) => a + b;
```

To import it in TypeScript file, TypeScript will yell at you (unless you opt out this check by setting `compilerOptions.allowJs` to `true` in `tsconfig.json`):

```js fileName=src/app.ts
import { sum } from './math'; // TypeScript Error: no declaration bla bla bla

console.log(sum(4, 5));
```

To fix it, create a `math.d.ts`:

```ts fileName=src/math.d.ts
export function sum(a: number, b: number): number;
```

And TypeScript will be happy now.

This `math.d.ts` file is known as *ambient module* (module without implementation). It is like the `declare` keyword, with the difference that `declare` works for a variable within the file while `.d.ts` works for a module. When you name a file as `<something>.d.ts`, TypeScript will automatically associate it with the file `<something>.js`. Similar to `declare` keywords, TypeScript will assume your ambient declaration is accurate and reflect the actual implementation.

## Declare Typing of Third Party Library

What about the third-party code in `node_modules` that is not TypeScript (which is all of them because nobody publish TypeScript files)?

Few possibilities:

1. The third-party package may includes the typing itself (by providing an `index.d.ts` file at the root of the package, or specified using `typings` in its `package.json`). In this case, TypeScript will able to associate the ambient declaration without you doing any work. Example: [`reselect` use the `typings` field][reselect] while [`axios` put the `index.d.ts` at its root.][axios].
1. If the third-party package does not include typing, you may be able to find type definition contributed by others from [DefinitelyTyped](http://definitelytyped.org/), which publish its package under `@types` scope. For instance, `react-router-dom` does not comes with typing definition and you can install the typing with `npm install @types/react-router-dom`. By default, if TypeScript could not find typing definition in the package folder, it will try to resolve it in `node_modules/@types` folder.
1. If unfortunately nobody contribute the typing of the package you use to DefinitelyTyped, the last resort is to declare it yourself. To do that you need to create an *ambient module declaration*. An ambient module declaration has the following format and must follow the naming `.d.ts`.

    ```ts fileName=xyz.d.ts
    declare module 'my-utils' {
        export const a: number;
        export function doX(a: boolean): void;
    }
    ```

    The confusing part here is that compared to the `math.d.ts` example above, there is no any special requirement of the file name here except the it must ends with `.d.ts`. As long as the `xyz.d.ts` file above is included in the compilation, TypeScript will register that there's a module named `my-utils` which then can be imported with:

    ```ts
    import { a, doX } from 'my-utils';
    ```

    But how do we include `xyz.d.ts`? Few ways:

    - Specify path in `compilerOptions.typeRoots` in `tsconfig.json`.
    - Specify `files` in `tsconfig.json`.
    - Use the triple slash directive `/// <reference path="..." />`
    
<aside>

If you use Create React App with TypeScript, this is what it does when it add a `react-app-env.d.ts` inside your `src` folder with the content: `/// <reference types="react-scripts" /> `. Because `react-app-env.d.ts` is inside `src` folder so TypeScript will pick it up, and that will load the *ambient module declaration* inside `react-scripts` package, which include the stub definition for all your non JavaScript files import, e.g. `*.css`, `.scss`, `*.png` etc.

</aside>

[reselect]: https://github.com/reduxjs/reselect/blob/ac77610bbb0a3cab9b280ea5ea379c2387017446/package.json#L8
[axios]: https://github.com/axios/axios/blob/19969b4fbd6b5b6da67825a69b0f317afa1327dd/index.d.ts