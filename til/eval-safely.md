---
title: 'Function constructor can be used as safe alternative to eval'
date: '2019-10-15'
topics: ['javascript']
---

How do you run arbitrary code provided as `string` in JavaScript when [you should not use `eval`][dont-use-eval]?

Answer: [`Function` constructor][function-constructor]

```js live
const logFn = console.log;
const minusFn = (a, b) => a - b;

const codeRunner = new Function(
  // code will have access to `log` and `minus` parameter
  'log',
  'minus',
  `
    var x = 100;
    var y = 100;
    log(x + y);
    log(minus(x, y));
` // string to be evaluated as code
);

codeRunner(logFn, minusFn);
// provide the `log` and `minus` parameter
```

The difference of `Function` constructor and `eval` is that `eval` has access to local variable where you run it, while `Function` constructor only has access to the parameters provided and global variables only.

What's the use of this? Not much, but [it enables][react-live-code] the code snippet in this site to be edited and run safely.

[dont-use-eval]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Do_not_ever_use_eval!
[function-constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[react-live-code]: https://github.com/FormidableLabs/react-live/blob/1a3c537b6f770b0f6cefa9216576dd8213003110/src/utils/transpile/evalCode.js
