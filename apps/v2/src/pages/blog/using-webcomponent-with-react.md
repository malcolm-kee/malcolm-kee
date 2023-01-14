---
title: 'Using Web Component With React'
pubDate: 17 Mar 2019
description: "Using web component in React requires some boilerplates to make it work, trying to abstract that boilerplate has a limitation. With React hooks, it's much less boiletplate and the abstraction is no longer needed."
layout: ~/layouts/BlogPost.astro
---

Recently I've created a simple wrapper for web components in my work, it looks like this:

```jsx
export class WebComponentWrapper extends React.Component {
  eventCallbacks = {};
  componentRef = React.createRef();

  onEvent = (eventType) => (event) => {
    // we will get the latest callback when the event happens
    this.props.eventHandlers[eventType](event);
  };

  componentDidMount() {
    const { eventHandlers } = this.props;
    Object.keys(eventHandlers).forEach((eventType) => {
      this.eventCallbacks[eventType] = this.onEvent(eventType);
      this.componentRef.current.addEventListener(
        eventType,
        this.eventCallbacks[eventType]
      );
    });
  }

  componentWillUnmount() {
    Object.keys(this.eventCallbacks).forEach((eventType) => {
      this.componentRef.current.removeEventListener(
        eventType,
        this.eventCallbacks[eventType]
      );
    });
  }

  render() {
    const { tag: Component, ...restProps } = this.props;
    return <Component {...restProps} ref={this.componentRef} />;
  }
}
```

And its usage is something like this:

```jsx
/**
 *  `min` and `max` are attribute for `<complex-date-field>` web component
 */
<WebComponentWrapper
  tag="complex-date-field"
  eventHandlers={{
    customEvent: customEventHandler,
    specialEvent: specialEventHandler,
  }}
  min="2019/03/17"
  max="2019/12/21"
/>
```

The wrapper was created due to the fact that, to listen to any event in web component in React, you need to create a ref to access the web component, then attach the event listener when did mount, and remove event listener before unmount.

## Hmmm... why so much code to listen to event?

A thing that a React developer may take for granted is that React doesn't differentiate between event listener and attributes. Everything you can pass to a component / html element is just Javascript variable, and they are all called `props`.

In contrast, in other frameworks (e.g. Angular and Vue), attributes and event listener are different entity, and you need to treat them differently e.g. you need to add special syntax `v:on`, `@` etc. for event. The differentiation of attribute and listener listener of Angular and Vue actually works closer to how html elements in browser works. For instance, to listen to a button click event, you need to attach the event listener with `addEventListener` instead of just passing down an attribute like `disabled` or `class`.

React abstracts that difference away and implement its event system to minimize performance issue (and unify how event works in different browser) while allowing you to write:

```jsx
<button onClick={onClick}>My Button</button>
```

Which I think, is good if you're only working with html elements.

The downside of having merging the concept of attribute and event listener is, React only recognizes vanilla html elements events. So when you want to listen to web component where you define your own custom event, React can't help you with that, and you need to attach them manually like I did.

## Any limitation of WebComponentWrapper?

There are one limitation of this component that I doesn't how how to solve yet, which is to allow the parent component to have access to the custom component (like `forwardRef`). React allows you to access an element with `createRef` (like what I did) or allow parent to access the underlying element with `forwardRef`, but there is no documentation on how to achieve both in the same component.

Meanwhile, it's very common for web component to expose some public method that parent can invoke. It's impossible to do so with `WebComponentWrapper`.

## Do you have something better?

If you're lucky to work in the project that use latest version of React (with React hooks), there is actually a better way to this, [`useEventListener`](https://www.npmjs.com/package/@use-it/event-listener) hook:

```jsx
import useEventListener from '@use-it/event-listener';

const MyComponent = ({ customEventHandler, specialEventHandler }) => {
  const webComponentRef = React.useRef(null);

  useEventListener('customEvent', customEventHandler, webComponentRef.current);
  useEventListener(
    'specialEvent',
    specialEventHandler,
    webComponentRef.current
  );

  return <complex-date-field ref={webComponentRef} />;
};
```

Now you have access to both ref and listen to web component event easily.
