---
title: 'jscodeshift'
topics: ['frontend-tooling']
---

[`jscodeshift`](https://github.com/facebook/jscodeshift) is a toolkit for creating codemods (code transformations) and running them. However, its [README](https://github.com/facebook/jscodeshift#jscodeshift--) and [docs](https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation) are quite lacking for me; I have to scratch my head every time I am writing a new codemod. This is my documentation on it based on my understanding, use their docs as source of truth in case there is any deviation.

There are two parts of `jscodeshift`, as a command (you use it by typing command into your terminal) and as a library (you use it in your js code). This note will focus on the second part, using it as a library to write code that transform your code.

## Getting Started: Add a Transform Module (the script that transform code)

Create a js file that export a function like below:

```js
module.exports = function (fileInfo, api, options) {
  const source = fileInfo.source;

  // change source code here

  return source; // return changed code
};
```

This js file is called transform module in `jscodeshift`, as it is a _module_ (js file) that perform code _transformation_. During codemod execution, this function will be called for each source code independently.

The parameters provided to the function are:

1. `fileInfo`: Info about file being transformed, contains two properties: `path` (file path) and `source` (file content). Most of the time we only use the `source` property because code transformation is usually based on coding pattern instead of where the code is, however `path` is there just in case you need it.
1. `api`: An object that exposes 4 properties:

   - `jscodeshift`: This is the `jscodeshift` library that provides utility for you to navigate and change the source code. We will go through them in details slightly later.
   - `j`: This is an alias of `jscodeshift`. There is no difference with `jscodeshift` property except that you only need to type one character instead of eleven.
   - `stats`: A function to collect statistics. I don't have use case for it so refer to their docs.
   - `report`: call this if you want to log something. Its purpose is like `console.log` for us, since `console.log` doesn't work in transform module. This behavior is because transform module does not run on main NodeJS thread, but as a separate worker thread.

1. `options`: all the options that are passed to jscodeshift command. I have no use of this so please refer to [official docs](https://github.com/facebook/jscodeshift#options) instead.

### Optional: Define Parser

Because there are many flavors of JavaScript, with syntax difference between them, `jscodeshift` allows us to specify which parser should be used when parsing our source code by exporting a `parser` property.

```js twoslash {9}
module.exports = function (fileInfo, api, options) {
  const source = fileInfo.source;

  // change source code here

  return source; // return changed code
};

module.exports.parser = 'ts';
```

The value of `parser` could be `babel`, `babylon`, `flow`, `ts`, or `tsx`.

## `jscodeshift` API

When using `jscodeshift`, the main data structure that we will interact with mostly is `Collection`, which exposes methods for us to:

1. find the code that we interested
2. change the code

### `Collection`

`Collection` is a custom data structure in `jscodeshift` to represent a list of code elements, which you can used for further filtering (like searching for certain code syntax) or manipulation (like replace them with something else). We can get a `Collection` object by calling `jscodeshift` (or `j`).

In the snippet below, we get a collection object that represent the source code, and return them.

```js {1,5}
module.exports = function (fileInfo, { j }, options) {
  const collection = j(fileInfo.source);

  // change source code here

  return collection.toSource(); // return changed code
};
```

Following are the methods in `Collection`:

#### `Collection.find()`

#### `Collection.filter()`

#### `Collection.forEach()`

#### `Collection.replaceWith()`

#### `Collection.replaceWithSource()`

#### `Collection.insertBefore()`

#### `Collection.insertAfter()`

#### `Collection.remove()`

#### `Collection.toSource()`
