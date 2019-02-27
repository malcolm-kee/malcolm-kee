---
path: "/blog/typesafe-call-all"
date: "2019-02-24"
title: "Type-Safe callAll"
tags: ["typescript"]
summary: "You can have typesafe callAll utility in Typescript 3"
published: true
---

When writing React components, one of the utility functions that I find useful and commonly use is the `callAll` function, which I learnt from [Kent C. Dodds][kentcdodds] from one of his classes.

The use of `callAll` is to wrap few functions together (some of them optional, thus could be `undefined`), and create another function that will call each of them with the parameters.

For example:

```js
function fn1(x) {
  console.log('x from fn1: ', x);
}

function fn2(x, y) {
  console.log('result from fn2: ', x + y);
}

const missingFn = undefined;

const wrapperFn = callAll(fn1, fn2, missingFn);

wrapperFn(2, 3);
// x from fn1: 2
// result from fn2: 5
```

It is commonly used in React when you want to wrap some component to have additional callBack, without writing the null check in the already ugly arrow function in jsx:

```jsx
// instead of this
<input onChange={ev => {
    if (props.onChange) {
        props.onChange(ev);
    }
    onChangeValue(ev);
}} />

// we can do this!
<input onChange={callAll(props.onChange, onChangeValue)} />
```

Its implementation in javascript is pretty simple:

```js
const callAll = (...fns) => (...args) =>
  fns.forEach(fn => typeof fn === 'function' && fn(...args));
```

However, when I wanted to use that function in Typescript, I had problem providing the typings for the `fns` and `args` parameters. I had to resort to use `any`, which lose proper typechecking and intellisense for the function parameters.

```typescript
type CallBack = (...args: any[]) => void;

const callAll = (...fns: Array<CallBack | undefined>) => (...args: any[]) =>
  fns.forEach(fn => typeof fn === 'function' && fn(...args));
```

Recently I've do some googling (or you could say "researching"), and I find out that we could have typesafe `callAll` by utilizing [rest elements in tuple types][rest-tuple-types] that is introduced in Typescript 3.

The implementation:

```typescript
interface CallBack<Params extends any[]> {
  (...args: Params): void;
}

const callAll = <Params extends any[]>(
  ...fns: Array<CallBack<Params> | undefined>
) => (...args: Params) =>
  fns.forEach(fn => typeof fn === 'function' && fn(...args));
```

That's it!

[kentcdodds]: https://kentcdodds.com/
[rest-tuple-types]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#rest-elements-in-tuple-types
