---
title: 'Reduce redux-connect Typescript boilerplate'
date: '2019-09-21'
tags: ['typescript', 'react', 'redux']
keywords: ['redux', 'typescript', 'boilerplate']
summary: 'Use Typescript ReturnType to reduce your Redux connect boilerplate'
published: true
---

When you write React Redux connected component with Typescript, if you want a make sure your `mapStatesToProps` and `mapDispatchToProps` are typed-checked, often you need to write verbose code like below:

```ts
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

const TodoItemView: React.FC<
  ParentProps & StoreProps & DispatchProps
> = props => {
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

And that's a pain-in-the-ass, as your selectors and actions are already properly typed, now you need to duplicate it. In addition, everytime you want to inject a new props/new actions, you need to update both the typing and the mapProps function.

Recently, I've stumble upon `ReturnType` in Typescript, and that's the solution to fix the boiletplate:

```ts
import * as React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from './actions';
import { selectTodoStatus, selectTodoDescription } from './selectors';
import { RootState } from './type';

interface ParentProps {
  id: string;
}

const TodoItemView: React.FC<
  ParentProps &
    // highlight-start
    ReturnType<typeof mapStatesToProps> &
    ReturnType<typeof mapDispatchToProps>
  // highlight-end
> = props => {
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
