---
title: 'Extending Global or Third Party Library Typing'
date: '2019-10-09'
topics: ['typescript']
---

When you use `TypeScript`, it comes with many declarations that is part of JavaScript standard, e.g. `Array.prototype.map`, and `Object.keys`, so Intellisense just works when you use those standard JavaScript object method.

However, assuming that your company extends those global object with its own custom methods (I am not saying this is a good idea), how do you make TypeScript recognize it?

Because extending object in JavaScript is something many people used to do, TypeScript provides you a mechanism to do it. Just like you can merge JavaScript object, you can merge declaration in TypeScript.

## Extend Global Object & Declarations

To extends global object e.g. `Array`, include the following code in any TypeScript file in your project:

```ts
declare global {
  interface Array<T> {
    customMethod: (param: string) => void;
  }
}
```

<aside>

It may or may not works depends on where you add the code:

- if you add it into a `script`, it will not work.
- if you add it into a `module`, it would works.

If it doesn't work (which means you had added to a `script`), remove the `declare` clauses so that it becomes:

```ts
interface Array<T> {
  customMethod: (param: string) => void;
}
```

What is the difference between `script` and `module`? I will leave that for another day.

</aside>

Because TypeScript also declare `Array` under global, when it sees the code above, it will interpret that as your intention to add additional methods to `Array`, so it merge that into the original `Array.prototype` declaration.

The same approach is used to add your custom web component tag so TypeScript allow it to be part of JSX:

```ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-custom-component': any;
    }
  }
}
```

Then you can render that it in your React component:

```tsx
const MyComponent: React.FC = () => (
  <div>
    <my-custom-component></my-custom-component>
  </div>
);
```

<aside>

Fun fact: the following also able to add custom tag to JSX

```ts
declare global {
  module JSX {
    interface IntrinsicElements {
      'my-custom-component': any;
    }
  }
}
```

This is because a global module and global namespace are all just global variables.

Fine, this is not fun, just confusing.

</aside>

## Extend Third Party Declaration
