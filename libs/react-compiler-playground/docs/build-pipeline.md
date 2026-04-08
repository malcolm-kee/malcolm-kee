# Build pipeline

The build is driven by [tsup.config.ts](../tsup.config.ts). This note only
covers the non-obvious design decisions — for exact config values, shim
surface, and plugin mechanics, read the config file.

## Why this setup exists

`babel-plugin-react-compiler` (and `prettier/standalone`, and a few other
deps) are written for Node. We ship them in a React component library
that has to run in the browser. That is the whole reason the config is
more involved than a typical tsup setup:

- `platform: 'browser'` + React peers in `external`.
- A minimal `process` polyfill and a throwing `require` stub injected via
  `banner.js`, so Node-targeting transitive deps don't crash at module
  load time.
- Node built-ins rewritten at resolve time by `nodeShimsPlugin`.
- `@types/react` inlined as a raw string by `rawDtsPlugin` so Monaco can
  feed it to `addExtraLib` at runtime.
- `splitting: true` because
  [Editor/index.tsx](../src/components/Editor/index.tsx) lazy-loads
  `EditorImpl`, keeping Monaco and the compiler out of the initial chunk.

## The two custom plugins

Both live in [tsup.config.ts](../tsup.config.ts):

- **`rawDtsPlugin`** rewrites any `import '@types/react/index.d.ts'` into
  an ES module that default-exports the file contents as a string. Monaco
  needs this for
  [Input.tsx](../src/components/Editor/Input.tsx)'s `addExtraLib` call.
  The `@ts-expect-error` on that import is required and should stay —
  TypeScript rightly rejects importing a `.d.ts` as a value, but the
  plugin makes it work at runtime.

- **`nodeShimsPlugin`** redirects `path` to the real `path-browserify`
  package and replaces `fs`, `os`, `tty`, `crypto`, `assert`, `buffer`,
  `util` with tiny inline stubs from the `NODE_SHIMS` record. The stubs
  deliberately implement only the functions the transitive deps actually
  call — do not expand them speculatively.

## Adding or upgrading a dependency

If a new dep (or a dep upgrade) pulls in a Node built-in that is **not**
already shimmed, the build will fail with an esbuild "Could not resolve"
error. Options, in rough order of preference:

1. If the dep is not actually needed in the browser, add it to `external`.
2. If a real browser-compatible polyfill exists on npm, add a redirect
   like the `path-browserify` one.
3. Otherwise, add a minimal entry to `NODE_SHIMS` that exports the exact
   names the consumer references.

Do not add `@esbuild-plugins/node-modules-polyfill` or similar blanket
polyfills — the whole point of this setup is to keep the bundle small.

## Styles

`./styles.css` is exported via the `exports` field in
[package.json](../package.json) and maps directly to
[src/styles.css](../src/styles.css) — it is **not** bundled into `dist/`.
Consumers must import it explicitly:

```ts
import '@mkee/react-compiler-playground/styles.css';
```

The stylesheet has no Tailwind directives; it's plain CSS. Tailwind
utility classes used throughout the JSX must be compiled by the consuming
app's Tailwind config — this library does not ship its own Tailwind build.
