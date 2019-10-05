---
title: 'Introduction to React with Typescript'
date: '2018-05-10'
tags: ['react', 'typescript', 'beginner']
summary: 'Using typescript allow static typechecking and intellisense in your React application, and it is easy to get started.'
published: true
---

## Background

[React][reactjs] is the most popular Javascript (JS) library for building user interfaces from Facebook.

Unlike Angular, React is a library for the UI only; it does not comes with other common tools for a frontend application, e.g. state management, routing, and ajax call.

## Why Typescript

One of the thing that React do not mandate is static typechecking system.

As JS is a weakly typed language, static typechecking system is introduced into JS application as it can catch a lot error during compile time, which is cheaper and easier to fix than runtime error.

The 2 most common static typechecking system to be used with React are:

- Flow (from Facebook as well) and
- Typescript.

Even though Flow is used by Facebook internally for their React applications (thus theoretically they should work together better than Typescript), but Typescript support for React is very good as well except for some [edge cases][edge-case-bug].

For a developer that has previous experience in Typescript (probably with Angular), using Typescript is a better option because you can utilize your previous knowledge.

## Setting Up

Setting up the application to use React with Typescript requires configuration of webpack, babel, and typescript. If you like to learn about them, you can refer to this [Medium article][medium-article].

If you just want to get started and start coding, I would recommend [create-react-app-typescript][create-react-app-typescript].

Run the following commands in your command prompt (after you've installed [node.js with npm][nodejs-download-link]):

```sh
npm install -g create-react-app

create-react-app my-app-name --scripts-version=react-scripts-ts
cd my-app-name
npm start
```

## How to Type Props

`Props` is the "input" to a React component from the parent to control it. If you do not know what is `props`, read this [section][react-props] of React docs before continue.

### Type Props for Stateless Functional Component

Take a `Profile` component that shows username and email address as an example:

```jsx
import React from 'react';

export const Profile = props => {
    return (
        <div>
            <h1>{props.username}<h1>
            <p>{props.email}</p>
        </div>
    );
};
```

Creating similar version in typescript with typing for the `props` would be:

```ts
import * as React from 'react';

interface IProps {
    username: string;
    email: string;
}

export const Profile: React.SFC<IProps> = props => {
    return (
        <div>
            <h1>{props.username}<h1>
            <p>{props.email}</p>
        </div>
    );
};
```

Note that:

- The `import` statement for React in Typescript should be in the format of `* as React`.
- `IProps` can be renamed as simpler `Props`, depending on your naming convention.

### Type Props for Class Component

Reusing the previous `Profile` example, but making it as Class Component:

```jsx
export class Profile extends React.Component{
    render() {
        return (
            <div>
                <h1>{this.props.username}<h1>
                <p>{this.props.email}</p>
            </div>
        );
    }
}
```

Typescript version:

```ts
interface IProps {
    username: string;
    email: string;
}

export class Profile extends React.Component<IProps>{
    render() {
        return (
            <div>
                <h1>{this.props.username}<h1>
                <p>{this.props.email}</p>
            </div>
        );
    }
}
```

## How to Type State

`State` is any arbitrary data that you would like to track as part of your component, e.g. a checkbox has a state to tracked if it is ticked, or a toggler to track if it is toggled etc. You can read more about `state` [here][react-state].

### Type State for Class Component

Only Class Component can has its own state.

Using a button that use the label on it to indicate its current status:

```jsx
export class Button extends React.Component {
  state = {
    on: false,
  };

  handleToggleOn = () => {
    this.setState(prevState => ({
      on: !prevState.on,
    }));
  };

  render() {
    return (
      <button onClick={this.handleToggleOn}>
        {this.state.on ? 'On' : 'Off'}
      </button>
    );
  }
}
```

Including typing of the state in Typescript version:

```ts
interface IState {
  on: boolean;
}

export class Button extends React.Component<{}, IState> {
  state: IState = {
    on: false,
  };

  handleToggleOn = () => {
    this.setState(prevState => ({
      on: !prevState.on,
    }));
  };

  render() {
    return (
      <button onClick={this.handleToggleOn}>
        {this.state.on ? 'On' : 'Off'}
      </button>
    );
  }
}
```

That's it!

## Further Readings

- [JSX section in Typescript docs](https://www.typescriptlang.org/docs/handbook/jsx.html)
- [TodoMVC React Typescript](http://todomvc.com/examples/typescript-react/#/)

<hr />

If you're a ReactJS developer or interested to learn React, come join my [Meetup group](https://www.meetup.com/kl-react/).

[reactjs]: https://reactjs.org/
[react-props]: https://reactjs.org/docs/components-and-props.html
[react-state]: https://reactjs.org/docs/state-and-lifecycle.html
[edge-case-bug]: https://github.com/Microsoft/TypeScript/issues/13948
[medium-article]: https://blog.logrocket.com/how-why-a-guide-to-using-typescript-with-react-fffb76c61614
[create-react-app-typescript]: https://github.com/wmonk/create-react-app-typescript
[nodejs-download-link]: https://nodejs.org/en/download/
