---
title: 'Reduce redux-connect Typescript boilerplate'
pubDate: 21 Sep 2019
updatedDate: 26 Jan 2020
description: 'Use Typescript ReturnType to reduce your Redux connect boilerplate'
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

```tsx twoslash {24-26}
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

type TodoStatus = 'not_started' | 'in_progress' | 'done';

type RootState = {
  todos: Record<string, { status: TodoStatus; description: string }>;
};

const toggleTodo = (id: string) => ({
  type: 'toggle',
  id,
});

const selectTodoStatus = (state: RootState, id: string) =>
  state.todos[id].status;

const selectTodoDescription = (state: RootState, id: string) =>
  state.todos[id].description;

interface ParentProps {
  id: string;
}

const TodoItemView = (
  props: ParentProps &
    // ^?
    ReturnType<typeof mapStatesToProps> &
    ReturnType<typeof mapDispatchToProps>
) => {
  return <div>...</div>;
};

const mapStatesToProps = (state: RootState, ownProps: ParentProps) => ({
  status: selectTodoStatus(state, ownProps.id),
  description: selectTodoDescription(state, ownProps.id),
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ParentProps) => ({
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

```tsx twoslash {1,24,25,39,41}
import { connect, ConnectedProps } from 'react-redux';
import type { Dispatch } from 'redux';

type TodoStatus = 'not_started' | 'in_progress' | 'done';

type RootState = {
  todos: Record<string, { status: TodoStatus; description: string }>;
};

const toggleTodo = (id: string) => ({
  type: 'toggle',
  id,
});

const selectTodoStatus = (state: RootState, id: string) =>
  state.todos[id].status;

const selectTodoDescription = (state: RootState, id: string) =>
  state.todos[id].description;

interface ParentProps {
  id: string;
}

const TodoItemView = (
  props: ParentProps &
    // ^?
    ConnectedProps<typeof connector>
) => {
  return <div>...</div>;
};

const mapStatesToProps = (state: RootState, ownProps: ParentProps) => ({
  status: selectTodoStatus(state, ownProps.id),
  description: selectTodoDescription(state, ownProps.id),
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ParentProps) => ({
  toggle: () => dispatch(toggleTodo(ownProps.id)),
});

const connector = connect(mapStatesToProps, mapDispatchToProps);

export const TodoItem = connector(TodoItemView);
```
