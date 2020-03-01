---
title: Mocking
description: How to mock code in Jest
date: '2020-02-25'
objectives:
  - what is mocking and its uses and tradeoffs
  - how to mock in Jest
---

## What is Mocking

Imagine our site goes through a payment gateway. If we perform an actual transaction, running the test will cost us a fortune.

Imagine everytime you go through a form it will send network requests to your server. If there is any network issue or your server is down, then your test will fails without any issue in your code.

How do we solve these problems? Mocking.

Mocking is the process of switching an actual operation to something that "seems like the actual operation" as far as your code cares.

For instance, instead of going through an actual transaction, we can replace the payment gateway with a fake gateway that returns similar response. Instead of making network requests, we replace it with a function that returns similar data.

## The Downside of Mocking

Mocking may seems nice, however it comes with a big drawbacks: you're no longer verifying the actual behaviors.

Nonetheless, as discussed, there are valid scenarios for mocking, just beware of unnecessary mocking.

## How to Mock Your Code

```jsx fileName=auth.service.spec.js
import { register } from './auth.service';
```

## How to Mock Libraries

## Mock Global Function/Object

## Mocking Libraries

`xhr-mock`
