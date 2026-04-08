# Architecture

## Entry point

[src/index.ts](../src/index.ts) re-exports a single component,
`ReactCompilerPlayground`, defined in
[src/ReactCompilerPlayground.tsx](../src/ReactCompilerPlayground.tsx). That
component wires up three things and nothing else:

1. `StoreProvider` — shared state (source + config + `showInternals`).
2. `SnackbarProvider` (notistack) — for lint/diagnostic toasts.
3. `Header` (optional) + `Editor` — the UI.

Consumers are responsible for importing `./styles.css` separately (it is
exposed via the `./styles.css` export in [package.json](../package.json) and
intentionally not bundled into `dist/`).

## State management

There is no external state library. State lives in a `useReducer` inside
[`StoreProvider`](../src/components/StoreContext.tsx) and is published through
two contexts created via the custom
[`createContext`](../src/lib/createContext.ts) helper (it throws if consumed
outside a Provider — do not replace it with `React.createContext` directly):

- `StoreContext` → current `Store` ({ source, config, showInternals })
- `StoreDispatchContext` → the dispatcher

The store is persisted to `localStorage` **and** the URL hash (lz-string
compressed) via [src/lib/stores/store.ts](../src/lib/stores/store.ts). On
mount, `initStoreFromUrlOrLocalStorage` reads the hash first, then
localStorage, then falls back to
[`defaultStore`](../src/lib/defaultStore.ts).

## Compile pipeline

`Editor` calls [`compile(source, mode, configOverrides)`](../src/lib/compilation.ts)
twice for each input — once in `'compiler'` mode and once in `'linter'`
mode — then merges the two so that successful compiler output can still
display lint diagnostics in the Output tab.

Inside `compile()`:

1. Parse with `@babel/parser` (TypeScript+JSX).
2. Parse pragma directives from the first line via `parseConfigPragmaForTests`.
3. Parse the config editor contents with **JSON5** (not JSON — comments and
   trailing commas are allowed, and `compilation.spec.ts` has a regression
   test for this).
4. Merge pragma options + config-editor options + `COMMON_HOOKS` (Relay
   hooks) into a single `PluginOptions`.
5. Run `transformFromAstSync` with `babel-plugin-react-compiler` and a
   custom `logger` that captures IR at each pass into the `results` map.
6. Return a discriminated union: `{ kind: 'ok', transformOutput, results,
errors }` or `{ kind: 'err', error, results }`.

`'linter'` mode differs only in the `environment` it passes: it enables
`validateNoSetStateInRender`, `validateNoSetStateInEffects`, etc., and
disables `validateRefAccessDuringRender`. Any change to the linter rule set
belongs there.

## Output formatting

The pipeline in
[components/Editor/Output.tsx](../src/components/Editor/Output.tsx) (`tabify`)
is: `compile → prettier → rewriteCompilerOutput → (prettier again in tests)`.

[`rewriteCompilerOutput`](../src/lib/rewriteCompilerOutput.ts) is a small
Babel plugin that renames compiler-generated symbols to be more teachable:

- `_c` → `createMemoCache`
- `$` → `memoCache`
- `Symbol.for("react.memo_cache_sentinel")` → `IS_UNINITIALIZED` (hoisted
  as a top-level `const`)

It runs with `retainLines: true`, which can collapse the hoisted sentinel
onto a neighbouring line — the test pipeline runs prettier a second time
to clean that up (see [testing.md](testing.md)).

## Editor (Monaco) details

- [`Input.tsx`](../src/components/Editor/Input.tsx) injects `@types/react`
  into Monaco as an extra lib. It reads the type declarations from a
  `@types/react/index.d.ts` import that is rewritten to a raw string at
  build time by the `raw-dts` esbuild plugin (see
  [build-pipeline.md](build-pipeline.md)). The `@ts-expect-error` comment
  on that import is intentional — TypeScript rightly thinks you cannot
  import a `.d.ts` file as a value.
- [`ConfigEditor.tsx`](../src/components/Editor/ConfigEditor.tsx) is a
  JSON editor configured with `allowComments: true, trailingCommas:
'ignore'` so it matches the JSON5 parser used in `compile()`.
- [`reactCompilerMonacoDiagnostics.ts`](../src/lib/reactCompilerMonacoDiagnostics.ts)
  translates `CompilerErrorDetail`/`CompilerDiagnostic` into Monaco markers
  and gutter decorations.

## View transitions

The playground uses React's experimental `ViewTransition` via a thin
compat shim in
[src/lib/viewTransitionCompat.tsx](../src/lib/viewTransitionCompat.tsx) that
falls back to a plain fragment if the unstable API is absent. Transition
name constants live in
[src/lib/transitionTypes.ts](../src/lib/transitionTypes.ts) — add new
transition names there, not inline as strings.
