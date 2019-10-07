---
title: 'There is no way to type as props properly in TypeScript currently'
date: '2019-10-06'
topics: ['typescript']
---

Stumble upon the blog post ["Writing Type-Safe Polymorphic React Components (Without Crashing TypeScript)"][polymorphic-components] today and get the answer that I always trying to solve every few weeks and gave up after wasting few hours: how to properly type the `as` props in React component in TypeScript.

The summary of that post is this: it requires black-magic of knowledge in TypeScript (the author works on TypeScript language and compiler!) and you may crash the TypeScript service when you do that. The solution is to use render-props pattern to allow consumer to change the html tag themselves.

In short, instead of this:

```jsx noWrapper
<Button color="primary" as="a" href="/hello">
  Hello
</Button>
```

Design your API like this:

```jsx noWrapper
<Button
  color="primary"
  renderContainer={buttonProps => <a href="/hello" {...buttonProps} />}
>
  Hello
</Button>
```

Yeah, it's ugly. I know.

[polymorphic-components]: https://blog.andrewbran.ch/polymorphic-react-components/
