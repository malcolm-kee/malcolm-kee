---
title: 'Reduce redux-connect Typescript boilerplate'
date: '2019-09-21'
updated_at: '2020-01-26'
tags: ['typescript', 'react', 'redux']
keywords: ['redux', 'typescript', 'boilerplate']
summary: 'Use Typescript ReturnType to reduce your Redux connect boilerplate'
published: true
---

When you write React Redux connected component with Typescript, if you want a make sure your `mapStatesToProps` and `mapDispatchToProps` are typed-checked, often you need to write verbose code like below:

```tsx
import * as React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from './actions';
import { selectTodoStatus, selectTodoDescription } from './selectors';
import { RootState } from './type';

interface ParentProps {
  id: string;
}

interface StoreProps {
  status: string;
  description: string;
}

interface DispatchProps {
  toggle: () => void;
}

const TodoItemView = (props: ParentProps & StoreProps & DispatchProps) => {
  return <div>...</div>;
};

const mapStatesToProps = (
  state: RootState,
  ownProps: ParentProps
): StoreProps => ({
  status: selectTodoStatus(state, ownProps.id),
  description: selectTodoDescription(state, ownProps.id),
});

const mapDispatchToProps = (
  dispatch: any,
  ownProps: ParentProps
): DispatchProps => ({
  toggle: () => dispatch(toggleTodo(ownProps.id)),
});

export const TodoItem = connect(
  mapStatesToProps,
  mapDispatchToProps
)(TodoItemView);
```

And that's a pain-in-the-ass, as your selectors and actions are already properly typed, now you need to duplicate it. In addition, everytime you want to inject a new props/new actions, you need to update both the typing and the mapProps function.

Recently, I've stumble upon `ReturnType` in Typescript, and that's the solution to fix the boiletplate:

```tsx
import * as React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from './actions';
import { selectTodoStatus, selectTodoDescription } from './selectors';
import { RootState } from './type';

interface ParentProps {
  id: string;
}

const TodoItemView = (
  props: ParentProps &
    // highlight-start
    ReturnType<typeof mapStatesToProps> &
    ReturnType<typeof mapDispatchToProps>
  // highlight-end
) => {
  return <div>...</div>;
};

const mapStatesToProps = (state: RootState, ownProps: ParentProps) => ({
  status: selectTodoStatus(state, ownProps.id),
  description: selectTodoDescription(state, ownProps.id),
});

const mapDispatchToProps = (dispatch: any, ownProps: ParentProps) => ({
  toggle: () => dispatch(toggleTodo(ownProps.id)),
});

export const TodoItem = connect(
  mapStatesToProps,
  mapDispatchToProps
)(TodoItemView);
```

Now you doesn't need to type `StoreProps` and `DispatchProps` manually, Typescript will infer them from your selectors and actions.

## Update on 26th Jan 2020

I've learnt recently that `react-redux` actually exports a `ConnectedProps` type utility that will infers the correct injected props for us.

Final version:

```tsx
import * as React from 'react';
// highlight-next-line
import { connect, ConnectedProps } from 'react-redux';
import { toggleTodo } from './actions';
import { selectTodoStatus, selectTodoDescription } from './selectors';
import { RootState } from './type';

interface ParentProps {
  id: string;
}

const TodoItemView = (
  props: ParentProps &
    // highlight-next-line
    ConnectedProps<typeof connector>
) => {
  return <div>...</div>;
};

const mapStatesToProps = (state: RootState, ownProps: ParentProps) => ({
  status: selectTodoStatus(state, ownProps.id),
  description: selectTodoDescription(state, ownProps.id),
});

const mapDispatchToProps = (dispatch: any, ownProps: ParentProps) => ({
  toggle: () => dispatch(toggleTodo(ownProps.id)),
});

const connector = connect(mapStatesToProps, mapDispatchToProps); // highlight-line

export const TodoItem = connector(TodoItemView); // highlight-line
```
