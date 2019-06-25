# malcolmkee.com

[![Build Status](https://travis-ci.org/malcolm-kee/malcolm-kee.svg?branch=master)](https://travis-ci.org/malcolm-kee/malcolm-kee) [![Netlify Status](https://api.netlify.com/api/v1/badges/86f46dd1-29fe-4d46-a094-067bc0c6225b/deploy-status)](https://app.netlify.com/sites/malcolmkee/deploys)

Source code for Malcolm Kee's [personal site](https://malcolmkee.com/) and workshop materials.

Workshop materials:

- [Introduction to React v2](https://malcolmkee.com/intro-to-react-js-v2)
- [Web Developer Toolbox](https://malcolmkee.com/web-developer-toolbox)
- [JavaScript: The React Parts](https://malcolmkee.com/js-the-react-parts)

## Code Snippet MDX Usage

This site is powered by [`gatsby-mdx`][gatsby-mdx], which enable the code editor in the markdown.

Live code editor mode will be enabled for two cases:

- the language is `js` (`javascript` will not be live code editor).
- the language is `jsx` with prop `live`

The props can be provided like this:

````md
    ```jsx live fileName=src/example.js
    () => <h1>Hello world!</h1>
    ```
````

The following props are supported:

- `fileName`: add fileName above the code snippet. Handy to indicate which file you're working on.
- `noWrapper`: remove the wrapper around code snippet. This is to remove the clutter.

Only applicable for language `jsx`:

- `live`: make the code live editor.
- `noInline`: make the render of component requires the call of `render`. This is actually props of `react-live`.

### Highlight Code

In addition, if the code snippets are not rendered as live code editor, you can highlight specific lines with the following special comments:

- highlight-next-line
- highlight-start
- highlight-end
- hightlight-line

## Local Build Time Optimization

It's possible to disable specific pages to optimize local build time by adding the following variables to a `env.development` file:

```
DISABLE_BLOG=true
ONLY_LAST_TEN_BLOGS=true
DISABLE_WORKSHOP=true
ONLY_WORKSHOP=intro-to-react-js-v2 # content id of workshop
```

[gatsby-mdx]: https://github.com/ChristopherBiscardi/gatsby-mdx
