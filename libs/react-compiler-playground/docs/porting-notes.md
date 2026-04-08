# Porting notes

Large parts of this library were ported from the React Compiler playground
in [facebook/react](https://github.com/facebook/react) (see the
[README](../README.md)). A handful of files retain the Meta copyright
header:

```ts
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
```

## Files with the Meta header

Preserve the header as-is when editing these files. They are the ones most
likely to benefit from occasional re-syncs with upstream:

- [src/components/Editor/index.tsx](../src/components/Editor/index.tsx)
- [src/components/StoreContext.tsx](../src/components/StoreContext.tsx)
- [src/lib/compilation.ts](../src/lib/compilation.ts) (partial — the
  `COMMON_HOOKS` list and parse helpers are upstream; the `logger` shape
  and return-tuple were adapted)
- [src/lib/createContext.ts](../src/lib/createContext.ts)
- [src/lib/defaultStore.ts](../src/lib/defaultStore.ts)
- [src/lib/reactCompilerMonacoDiagnostics.ts](../src/lib/reactCompilerMonacoDiagnostics.ts)
- [src/lib/stores/](../src/lib/stores/) — `index.ts`, `store.ts`, `messages.ts`

## Files that are original to this library

These were written specifically for this package and do not need to stay
in sync with upstream:

- [src/ReactCompilerPlayground.tsx](../src/ReactCompilerPlayground.tsx) —
  the public component wrapper with `height` / `withHeader` props.
- [src/lib/rewriteCompilerOutput.ts](../src/lib/rewriteCompilerOutput.ts) —
  the readable-names Babel plugin.
- [src/lib/viewTransitionCompat.tsx](../src/lib/viewTransitionCompat.tsx) —
  shim around React's unstable ViewTransition API.
- [src/type-patch.ts](../src/type-patch.ts) — `declare module` for
  `react/compiler-runtime`.
- [src/styles.css](../src/styles.css) — Tailwind utilities and view-transition
  keyframes.
- [tsup.config.ts](../tsup.config.ts) — the browser build setup described
  in [build-pipeline.md](build-pipeline.md).
- The entire test suite under [src/lib/](../src/lib/) (`*.spec.ts`,
  `__fixtures__/`).

## Keeping diffs with upstream small

When you *do* need to change a ported file, try to keep the structure of
the file close to its upstream counterpart — preserve import order, keep
unrelated helpers in place, and resist opportunistic refactors. A future
re-sync will be much easier if line-level diffs stay localised.

If a change to a ported file is large enough that re-syncing would be
painful anyway, feel free to also remove the Meta header — but call it
out in the commit message so the provenance is not lost.
