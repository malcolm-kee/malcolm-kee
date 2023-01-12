---
title: '@content: SASS equivalent of React children'
pubDate: 19 Sep 2019
description: 'Use @content to inject arbitrary content into your SASS @mixin'
layout: ~/layouts/BlogPost.astro
---

Do you know that you can use `@content` in SASS `mixin`? It works like React Children.

```scss noWrapper
@mixin focusedByMouse {
  &:focus:not(:focus-visible) {
    @content;
  }
}

.button {
  @include focusedByMouse {
    filter: none;
    border-color: transparent;
  }
}
```

Would transpile to:

```css noWrapper
.button:focus:not(:focus-visible) {
  filter: none;
  border-color: transparent;
}
```

Huh, you already know that?

Well, I just know it today, and this is my blog. Meh.
