---
title: Empathize with Backend Developer
pubDate: 17 Jan 2020
updatedDate: 20 Jan 2020
topics:
  - software-engineering
---

As someone that code primarily in JavaScript (with a little bit Unix scripting here and there), the ceremonies of many backend programming language seems overkill.

I believe that's due to what frontend and backend optimize for.

For frontend, we're usually the consumer side of the technology stack, and UI is prone to change frequently. As a result, what we optimize for is usually ease of change and delivery.

As backend, by definition you are the provider side of the technology stack, so you need to minimize breaking change (as usually it is hard to track down every single consumer), therefore it's important that you fulfill [open-closed principle]. So properly-designed interface and object hierarchy is worth the investment. And admit it, many times when requirement changes, you can push away the change to the frontend side instead. (But that's fine, we frontend engineers embrace changes. )

Of course, there are probably much more reasons that frontend code and backend code are so different, but that's not the main point here.

The main point is, instead of judging others' code as cow-boy (as some backend developer accuses frontend developer) or unnecessarily verbose (as some frontend developer accuses backend developer), try to empathize.

You're smart, but others are not stupid. Don't let your pride limit your mind.

[open-closed principle]: https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle
