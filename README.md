# malcolmkee.com

[![Build Status](https://travis-ci.org/malcolm-kee/malcolm-kee.svg?branch=master)](https://travis-ci.org/malcolm-kee/malcolm-kee) [![Netlify Status](https://api.netlify.com/api/v1/badges/86f46dd1-29fe-4d46-a094-067bc0c6225b/deploy-status)](https://app.netlify.com/sites/malcolmkee/deploys)

Source code for Malcolm Kee's [personal site](https://malcolmkee.com/) and workshop materials.

Workshop materials:

- [Introduction to React v2](https://malcolmkee.com/intro-to-react-js-v2)
- [Web Developer Toolbox](https://malcolmkee.com/web-developer-toolbox)
- [JavaScript: The React Parts](https://malcolmkee.com/js-the-react-parts)
- [Create a Fast Site with GatsbyJS](https://malcolmkee.com/fast-site-with-gatsby-js)

## Code Snippet MDX Usage

This site is powered by [`gatsby-mdx`][gatsby-mdx], which enable the code editor in the markdown.\*

Live code editor mode will be enabled when _all_ following conditions are met:

- the language is `js` or `jsx`.
- the props `live` is provided.

For example:

````md
    ```jsx live fileName=src/example.js
    () => <h1>Hello world!</h1>
    ```
````

The following props are supported:

- `fileName`: add fileName above the code snippet. Handy to indicate which file you're working on.
- `noWrapper`: remove the wrapper around code snippet. This is to remove the clutter.
- `highlightedLines`: comma-separated line numbers to be highlighted. This is not recommended if you can use special comments below, but some languages doesn't support comment (like JSON).

The following props are only applicable for language `jsx`:

- `noInline`: make the render of component requires the call of `render`. This is actually props of `react-live`.
- `previewOnly`: only shows the rendered result of the code, but not the code itself.

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
NUM_OF_BLOGS=15
DISABLE_WORKSHOP=true
ONLY_WORKSHOP=intro-to-react-js-v2 # content id of workshop
GITHUB_TOKEN=<Your_Github_Token>
GATSBY_GITHUB_TOKEN=<Your_Github_Token>
```

[gatsby-mdx]: https://github.com/ChristopherBiscardi/gatsby-mdx
