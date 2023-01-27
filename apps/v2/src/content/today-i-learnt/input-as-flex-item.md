---
title: 'Make Input as Flex Item'
pubDate: 15 Jan 2020
topics: ['css']
---

By default, when you try to make `<input>` as flex item, it won't work.

This is because `<input>` has `min-width` value by default, thus it will not size similarly even if you add `flex: 1` to it and its sibling.

To fix that, add `min-width: 0` to the input, and it should works nicely.
