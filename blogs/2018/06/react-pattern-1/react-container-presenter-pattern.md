---
title: 'React Patterns: Container-Presenter'
date: '2018-06-17'
tags: ['react', 'design pattern']
summary: 'There are a few design patterns of React component, and the easiest one is the Component-Presenter pattern, which is actually to separate mapping/states/transformation from the rendered content'
published: true
---

## Background

In software construction, design pattern is a common approach when designing your program. Besides making the design process more efficient, using design pattern to design your program also allow you to determine the tradeoff of a particular design, as the pros and cons of design patterns are studied.

Compared to OOP in which the well-known design patterns are documented clearly by the GOF book, the design patterns for React component are still in flux. However, there are a few patterns that had emerged and employed by many React developers today, i.e.:

1.  Container-presenter
2.  Compound component
3.  Higher order component
4.  Render props

This article aims to explain the container-presenter pattern.

## Problem

When we're writing a React component, other than writing how the UI looks like with the JSX, we're also concerned with:

- event handler
- data transformation/mapping/mutation
- states

When we're mixing the UI concern with all other code, it would makes the component harder to understand and reason with.

## Container-presenter

Container-presenter pattern means your React component should only be either concerned with UI (presenter) or other (container), but not both.

A presenter:

- concerned with how things look.
- usually have some DOM markup and styles or class as styling hook.
- don't specify how the data is loaded, transformed, or mutated.
- is usually written as functional component.
- have no dependency on the rest of the app, e.g. Flux actions or redux.

A container:

- concerned with how things work.
- usually no DOM markup, except wrapper `<div>`.
- provide the data and behavior to the child components.

## Examples

(Shamelessly steal and modified based on Michael Chan's [gist][gist])

```jsx
// CommentList.js - Presenter
import React from 'react';

const Commentlist = ({ comments, isLoading }) => (
  <ul>
    {isLoading && (
      <li>
        <span>Loading...</span>
      </li>
    )}
    {comments.map(({ body, author }) => (
      <li>
        {body}-{author}
      </li>
    ))}
  </ul>
);
```

```jsx
// CommentListContainer.js - Container
import React from 'react';
import CommentList from './CommentList';

class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [], isLoading: true };
  }

  componentDidMount() {
    fetch('/my-comments.json')
      .then((res) => res.json())
      .then((comments) => this.setState({ comments, isLoading: false }));
  }

  render() {
    return (
      <CommentList
        comments={this.state.comments}
        isLoading={this.state.isLoading}
      />
    );
  }
}
```

### Use with other patterns

Component that use render props pattern fully and do not render any DOM by itself should be placed in Container component as those component is concerned with behavior/states only.

[gist]: https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
