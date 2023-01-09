---
title: JQuery Overview
description: Learn how to install and use JQuery
date: '2020-07-18'
objectives:
  - how to add JQuery to your website
  - types of functionalities provided by JQuery
---

## Adding JQuery

There are few ways to add JQuery to your website, as described by [JQuery's installation guide](https://jquery.com/download/).

We will use the simplest way: adding a script tag to [JQuery's CDN](https://code.jquery.com/).

At the end of your HTML `body` tag, add the following script tag:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- your header tags -->
  </head>
  <body>
    <!-- content -->
    <!-- highlight-next-line -->
    <script src="https://code.jquery.com/jquery-1.12.4.js" />
  </body>
</html>
```

The script will expose to global variables: `JQuery` and `$`.
