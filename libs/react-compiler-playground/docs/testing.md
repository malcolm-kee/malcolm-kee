# Testing

Tests use **vitest** and live next to the code they exercise. There are two
test files today, both in [src/lib/](../src/lib/).

## Unit tests — `compilation.spec.ts`

[compilation.spec.ts](../src/lib/compilation.spec.ts) covers the edge cases
of the top-level `compile()` function: invalid source syntax, invalid
config-override JSON5, JSON5 comment/trailing-comma support, and linter-mode
diagnostics (e.g. `setState` during render). When adding a new branch to
`compile()`, add a case here.

## Fixture snapshot tests — `compilerPipeline.spec.ts`

[compilerPipeline.spec.ts](../src/lib/compilerPipeline.spec.ts) is an
end-to-end test of the same pipeline users see in the Output tab:

```
compile → prettier → rewriteCompilerOutput → prettier
```

The test discovers every `.tsx` file in
[src/lib/**fixtures**/](../src/lib/__fixtures__/) that is **not** a
`.snapshot.tsx` file, compiles it, and compares against a paired snapshot
file via `toMatchFileSnapshot`.

### Adding a fixture

1. Drop a new `.tsx` file into [src/lib/**fixtures**/](../src/lib/__fixtures__/).
   The file name (minus extension) becomes the test name. Keep the input
   minimal — a single component is ideal — so the snapshot stays readable
   when reviewing diffs.
2. Run `pnpm test -- -u` (or `pnpm vitest -u`) to generate the matching
   `<name>.snapshot.tsx` file.
3. **Commit both files together.** A bare fixture with no snapshot will
   still pass on first run (because `-u` would just create it) but will
   confuse future reviewers.

### Why prettier runs twice

`rewriteCompilerOutput` uses Babel with `retainLines: true`. When it
hoists the `IS_UNINITIALIZED` sentinel declaration, Babel sometimes
collapses it onto the same line as an adjacent statement. The test's
`formatForSnapshot` helper runs prettier a second time after the rewrite
so the on-disk snapshot is always cleanly line-wrapped — this mirrors the
behaviour in [Output.tsx](../src/components/Editor/Output.tsx), which also
prettifies before and after the rewrite. If you change one side of the
pipeline, change the other.

### A snapshot test is failing — what to do

1. Read the diff. If the new output is intentional (e.g. you changed
   `rewriteCompilerOutput` on purpose, or the compiler version was bumped
   and produces different IR), regenerate with `pnpm test -- -u` and
   inspect the snapshot diff in your PR.
2. If the diff is unexpected, the usual suspects are: accidental
   whitespace changes in `rewriteCompilerOutput`, a different prettier
   config drifting between the test helper and `Output.tsx`, or a real
   regression in `compile()`.

### Environment

These tests run in **Node**, not jsdom — they read files from disk via
`node:fs` and `node:url`. Do not import anything that touches Monaco,
`window`, or `document` from a test file.
