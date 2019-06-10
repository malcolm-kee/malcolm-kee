---
title: Components & Props
path: '/intro-to-react-js-v2/components-and-props'
description: 'Learn JSX and how to write and compose React components'
section: 'React Core'
---

In this section, we will discuss JSX, how to build up a complex React component by composing smaller components, and the rule of React component that we must follow.

## JSX

You do not need JSX to use React, as I've shown you in [previous section](/intro-to-react-js-v2/vanilla-react). However, JSX would make your code a bit more readable.

Let's convert `Movie` component to use JSX. It will look like this:

```jsx
import React from 'react';

export const Movie = props => (
  <div className="movie-container">
    <h1>{props.name}</h1>
    <h2>{props.releaseDate}</h2>
  </div>
);
```

- Personally, I feel this is more readable. You may feel uncomfortable to introduce HTML in Javascript, I invite you to give it a shot until the end of this workshop.
- Comparing with the previous code, now you know what actually JSX does &mdash; it is just translating those HTML tags into `React.createElement` calls. That's it.
- Note the strange `{props.name}` syntax: this is how you output Javascript expression. It you take away `{}`, it will literally output the string `props.name`.
- Notice you still have to import React despite React not being explicitly used. As JSX is compiled to `React.createElement`, anywhere you use JSX, you need to import React.

So now JSX is demystified a bit, let's go convert `App` and `index.js`.

```jsx
function App() {
  return (
    <div>
      <div className="title-bar">
        <h1>React Movie App</h1>
      </div>
      <Movie name="Aquaman" releaseDate="2018-12-07" />
      <Movie name="Bumblebee" releaseDate="2018-12-15" />
      <Movie
        name="Fantastic Beasts: The Crimes of Grindelwald"
        releaseDate="2018-11-14"
      />
    </div>
  );
}
```

```jsx
ReactDOM.render(<App />, document.getElementById('root'));
```

- Notice that first letter of `Movie` is capitalized. It _must_ be. Compare to use `React.createElement` directly, when using JSX there is no way for you to specify if the tag is a string (`'div'`) or a variable (`Movie`), so the convention is that if it is capitalized, then it is a React component assigned to the variable; else if it is lowercase, it will try to have `movie` as a web component.
- We now pass props down as we add attributes to an HTML tag.

<aside>

JSX is not part of Javascript, it's a special syntax introduced by React. Currently your code works because the development tools setup by Create React App will automatically compile it to `React.createElement`.

Commit: [`use jsx`](https://github.com/malcolm-kee/react-movie-app-v2/commit/3bbdb03122a2179918241780fa8a278a4d679308)

</aside>

## Composing Components

Components can refer to other components in their output, like how we use `Movie` component in our `App` now.

Typically, a React app has a single `App` component at the very top, which is composed by smaller components (which could be composed by even smaller components), e.g. `App` has a `LoginForm`, which is composed of `TextField`, `Button`, etc.

## Extracting Components

The other side of the coin for composing components is extracting components.

There are few reasons to extract components:

1.  You can reuse the extracted component elsewhere, instead of keep typing the same markup. This is what we did for `Movie` component.
1.  You can extract a section of your markup to smaller components to clarify your intents. This is like how you break down a long functions to smaller functions so it is easier to understand and reason with. Same technique applies for component as well.

Let's extract the title section in our `App` to a `TitleBar` component.

```jsx
// src/components/title-bar.js
import React from 'react';

export const TitleBar = props => (
  <div className="title-bar">{props.children}</div>
);
```

- `children` is a special props for React components. It's the contents within the JSX tags (if you remember, the third parameters to `React.createElement`). By using `children`, we're allowing the user of the components to insert any content they wish.

```jsx
// src/app.js
...
import { TitleBar } from './components/title-bar';
...
function App() {
  return (
    <div>
      <TitleBar>
        <h1>React Movie App</h1>
      </TitleBar>
      <Movie name="Aquaman" releaseDate="2018-12-07" />
      <Movie name="Bumblebee" releaseDate="2018-12-15" />
      <Movie
        name="Fantastic Beasts: The Crimes of Grindelwald"
        releaseDate="2018-11-14"
      />
    </div>
  );
}
```

- `App` component is now arguably less cluttered now, and now we can reuse `TitleBar` elsewhere in our `App`.
- Note that this is not the only way to extract `TitleBar`, I could of course make it stricter by extract it the following way:

```jsx
// src/components/title-bar.js
export const TitleBar = props => (
  <div className="title-bar">
    <h1>{props.title}</h1>
  </div>
);

// src/app.js
function App() {
  return (
    ...
    <TitleBar title="React Movie App" />
    ...
  )
}
```

- So which one is better? It all depends on your need. The former is more flexible, but it also means it's harder to ensure consistency across your apps. The latter is more restricted, but it's good to ensure consistency.
- My rule-of-thumb when extracting component are:
  1.  Unless it's one-to-one component (e.g. `Button` component that render a `button` element), I usually only start extracting when I see more than two repetitions. With three use cases, I have better idea on whether I should be more flexible or restricted.
  1.  Err on the side of restricted component API. Most of the time you can loosen it up if you think you need the extra flexibility, e.g.:
      ```jsx
      export const TitleBar = props => (
        <div className="title-bar">
          {props.title && <h1>{props.title}</h1>}
          {props.children}
        </div>
      );
      ```

Don’t be afraid to split components into smaller components.

## Using Spread Operators to Pass Through Props

We will gonna need a `Button` component in next section. Let's create it now.

```jsx
// src/components/button.js
import React from 'react';

export const Button = props => <button className="button" {...props} />;
```

- `Button` component is a simple wrapper around `button` element, and I want to make it accept all props a `button` component would accepts. There are many props a `button` element accept, instead of manually type all of them, we can use the useful object spread operators (the `...props` syntax).
- The `...props` in the `Button` component means applying what has been passed to `Button` as props to the `button`.

## Rule of React Component: Pure Function

A pure function is a function that:

1.  return value is only determined by its input, i.e. given the same input, you will always get the same output, regardless how many times you run it
1.  without side effects (change its input or other variables within the scope)

Consider the following examples below:

```javascript
// pure function
function sum(a, b) {
  return a + b;
}

// not a pure function, because it changes its input (side effect)
function addAmount(account, amount) {
  acount.total += amount;
}

let totalAmount = 100;
// not a pure function, because it changes other variable (side effect)
function addToTotal(amount) {
  totalAmount += amount;
}

// not a pure function, because its output does not depends on input entirely
function addRandomAmount(a) {
  return a + Math.random() * 100;
}
```

A React component has a rule: it must be a pure function, which means:

1.  you should make sure the generated React elements is the same, given same props
1.  you should never modify props in your React Component or make any side-effects (`addEventListener`, calling some other function etc.)

Of course, application UIs are dynamic and change over time. In [next section](/intro-to-react-js-v2/hooks), we will introduce a new concept of “state”. State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.

<aside>

Commit: [`extracting component`](https://github.com/malcolm-kee/react-movie-app-v2/commit/03a117818ed9aaef04e88af3615404ac0d0d9ab7)

</aside>
