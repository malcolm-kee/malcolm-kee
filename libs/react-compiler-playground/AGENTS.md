# react-compiler-playground

A React component library that exposes a self-contained, in-browser playground
for `babel-plugin-react-compiler` (ported from the playground in
[facebook/react](https://github.com/facebook/react)).

The public entry is a single component, `<ReactCompilerPlayground />`, exported
from [src/index.ts](src/index.ts).

## Commands

This package uses **pnpm** (inherited from the monorepo). Run all commands from
this directory.

| Task                     | Command           |
| ------------------------ | ----------------- |
| Build (ESM + `.d.ts`)    | `pnpm build`      |
| Watch build              | `pnpm dev`        |
| Run tests                | `pnpm test`       |
| Watch tests              | `pnpm test:watch` |
| Update fixture snapshots | `pnpm test -- -u` |

There is **no separate `typecheck` script** — type checking happens via
`tsup`'s `dts` step, so `pnpm build` is the way to verify types.

## Docs

- [docs/architecture.md](docs/architecture.md) — module layout, data flow,
  compile pipeline, state management.
- [docs/build-pipeline.md](docs/build-pipeline.md) — how `tsup` is configured
  to ship a browser build of `babel-plugin-react-compiler`, including the
  Node-builtin shims and the `@types/react` raw-dts trick.
- [docs/testing.md](docs/testing.md) — fixture-based snapshot tests and unit
  tests for `compile()`.
- [docs/porting-notes.md](docs/porting-notes.md) — which files were ported
  from the React repo and how to keep them mergeable.
