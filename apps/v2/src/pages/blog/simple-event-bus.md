---
title: 'Creating a Simple Event Bus'
pubDate: 9 April 2019
description: 'How to create an event bus to coordinate multiple section of your Javascript app.'
layout: ~/layouts/BlogPost.astro
---

If you're developing for a web application with frontend consists of multiple smaller apps, a common use case that you may need is to coordinate between those apps.

To do that, you may be thinking of using a state management library or pub-sub library to coordinate them, but if you're just thinking of simple coordination, including a third-party library might be overkill.

In fact, that's what happened to me in work recently. So instead of using another library, I decided to write a simple event bus.

## Usages

```js
const eventBus = createEventBus();
// eventBus is an object with two methods: `subscribe` and `publish`.

const unsub = eventBus.subscribe(function (ev) {
  console.log(ev);
});

eventBus.publish('hello');
// -> this will cause 'hello' being logged

unsub();

eventBus.publish('hello again');
// -> this will not be logged because no more subscriber
```

## Implementation

```js live
function createEventBus() {
  const subscribers = [];

  function subscribe(subscriber) {
    subscribers.push(subscriber);

    return function unsubscribe() {
      subscribers.splice(subscribers.indexOf(subscriber), 1);
    };
  }

  function publish(event) {
    subscribers.forEach((subscriber) => {
      try {
        subscriber(event);
      } catch (e) {
        console.error(e);
      }
    });
  }

  return {
    subscribe,
    publish,
  };
}
```

26 lines of code.

## How It Works: Closure

If Javascript is new to you, the implementation may confuse you. No class? And what's this function within function, and returns the functions?

The key to understand how the implementation works is the concept of closure in Javascript.

> **Closure** is the ability of function to access the variable where the function is declared.

Because of closure, `subscribe` function has the access to `subscribers` array even though it has been returned by the `createEventBus` function. Therefore, `subscribe` function is able to push a new item to the `subscribers` array.

Similarly, `publish` function has the access to `subscribers` array as well, thus it can loop through it and call every single subscriber in the `subscribers` array.

Also because of closure, `unsubscribe` function has the access to `subscriber` that's provided as parameter of `subscribe` function, thus it can use it to remove it from `subscribers` array.

## A Simpler Example Using Closure

If the example above is too confusing, especially if closure is a new concept to you, let's see another simple example.

```js
function createCounter(initialCount, step) {
  let count = initialCount;
  function increment() {
    count += step;
  }
  function decrement() {
    count -= step;
  }
  function getCount() {
    return count;
  }
  return {
    increment,
    decrement,
    getCount,
  };
}

const counter = createCounter(0, 2);
counter.increment();
counter.increment();
console.log(counter.getCount()); // 4
counter.decrement();
console.log(counter.getCount()); // 2

const counter2 = createCounter(100, 200);
counter2.increment();
counter2.increment();
console.log(counter2.getCount()); // 500
```

## Further Reading

I've discussed closure in more details in [this lesson](/js-the-react-parts/closure) of the [JavaScript: The React Parts](/js-the-react-parts) workshop.
