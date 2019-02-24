---
path: "/blog/typescript-type-guard"
date: "2018-11-26"
title: "Using Typescript Type Guard to Narrow Down Type"
tags: ["typescript"]
keywords: ["typescript", "type guard", "narrow down type"]
summary: "Using custom type guard allow us to create reusable checking that narrow down the type of a variable"
published: true
---

Typescript is aware of usage of the Javascript `instanceof` and `typeof` operators, and will narrow down the type accordingly when you use those operators in conditional block.

```typescript
function doSomething(x: number | string) {
  if (typeof x === 'string') {
    // Within the block TypeScript knows that `x` must be a string
    console.log(x.subtr(1)); // Error, 'subtr' does not exist on `string`
    console.log(x.substr(1)); // OK
  }
  x.substr(1); // Error: There is no guarantee that `x` is a `string`
}
```

(Example stolen from [Typescript Deep Dive](https://basarat.gitbooks.io/typescript/docs/types/typeGuard.html))

Usually, those typechecking are used frequently, and you may want to create some utility function to abstract it away. However, with those abstraction, you lose the narrowing down of typescript.

```typescript
function isString(value: any) {
  return typeof value === 'string';
}

function doSomething(x: number | string) {
  if (isString(x)) {
    // Typescript doesn't know that x must be a string
    console.log(x.subtr(1)); // Error,
    console.log(x.substr(1)); // Error
  }
}
```

## Solution: Custom Type Guard

Typescript introduces the concept of custom type guard, which allows you to create utility function that assert the type of the parameters.

```typescript
function isString(value: any): value is string {
  return typeof value === 'string';
}

function doSomething(x: number | string) {
  if (isString(x)) {
    // Typescript know x is a string
    console.log(x.subtr(1)); // Error,
    console.log(x.substr(1)); // OK
  }
}
```

## Side Note: npm package for common type checking

I've published a npm package, [`typesafe-is`](https://www.npmjs.com/package/typesafe-is) that consists of common type-checking with typeguard, as those are required in almost are javascript applications.
