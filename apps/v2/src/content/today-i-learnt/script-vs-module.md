---
title: 'Script versus Module in TypeScript'
pubDate: 10 Oct 2019
topics: ['typescript']
---

One of the confusing part of TypeScript is a file behave differently depends if you use the `import`, `export` syntax in the file.

For example, take the following example in my previous [TIL](/today-i-learnt/extending-global-or-third-party-type):

```ts
declare global {
  interface Array<T> {
    fly: () => void;
  }
}
```

If there is any `export`/`import` in the file, that snippet could correctly define a `fly` method on `Array.proptotype` correctly.

However, if you remove the `export` statement, suddenly it doesn't work.

Why?

The problem is when you have an `export`/`import` statement, TypeScript treat it as a _module_, else it will be treated as a _script_.

## Script

What is a _script_ in this context?

A _script_ in TypeScript means a file that is supposed to be compiled to a `.js` file to be included in a page with a `script` tag.

Therefore, variables and declaration in _script_ are global by default, just like any `.js` file included with a `script` tag.

Which is why, the `declare global` in previous snippet need to be removed if your file doesn't have any `export`/`import` statement. As _script_ are already global, `declare global` doesn't make sense any more so TypeScript just ignore it.

<aside>

You may argue that why TypeScript doesn't just understand the `declare global` even when the file is a _script_. I think that would be nice too. My wild guess that TypeScript doesn't do it is compatibility reasons. It would be great if you can enlighten me if you know.

</aside>

## Module

What is a module?

In some language a module means a package that consists of multiple classes and utilities.

In JavaScript/TypeScript world, a module is just a file that manage its own dependencies and exported members. It specifies its dependencies using the `import` keyword while declare its exported members using the `export` keyword. Everytime when you write in any JavaScript/TypeScript file with `import React from 'react'`, you're writing a module.

Since module interfacts with others using `export` and `import`, the variable declared in a module is local by default. (In you want to access global variables (e.g. variable in `window` object), you're encouraged to state it explicitly, e.g. `window.jQuery`.)

This is why to overwrite global interface or namespace, you need to add `declare global`.
