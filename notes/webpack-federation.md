---
title: 'webpack Federation'
---

In producer:

```js
{
    plugins: [
    new ModuleFederationPlugin({
      name: "producer",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './pathExposed': './src/pathInThisProject'
      },
      shared: require("./package.json").dependencies,
    }),
  ],
}
```

In consumer:

```js
{
    plugins: [
    new ModuleFederationPlugin({
      name: "starter",
      filename: "remoteEntry.js",
      remotes: {
        remoteLib: 'producer@http://producer-url.com/remoteEntry.js',
      },
      shared: require("./package.json").dependencies,
    }),
  ],
}
```

In consumer code:

```js
import remoteCode from 'remoteLib/pathExposed';
```
