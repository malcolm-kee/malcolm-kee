# Development

All commands run from the repo root unless noted.

## Package manager

The repository runs pnpm 12.5.1, pinned by `packageManager` in the root
`package.json` and by the package-manager section of `pnpm-lock.yaml`.

Volta's pnpm support is experimental and Volta 2.0.2 cannot launch pnpm 12's
new executable layout directly. Keep the root `volta.pnpm` pin at 10.30.0:
that version acts only as a Volta-compatible launcher and automatically hands
off to the repository-pinned pnpm 12. Verify the effective version with:

```bash
VOLTA_FEATURE_PNPM=1 pnpm --version # 12.5.1
```

Dependency policy belongs in `pnpm-workspace.yaml` rather than
`package.json#pnpm`. CI installs must use `pnpm install --frozen-lockfile`.

```bash
# Development
pnpm dev                    # Start dev server (v2 app on port 8989)
pnpm --filter v2 run build  # Build the v2 app (runs astro check + tsc + astro build)
pnpm --filter v2 run check  # Type check only

# Formatting
pnpm --filter v2 run format # Prettier format src files

# Unit tests (run from apps/v2 or use filter)
pnpm --filter v2 run test             # Vitest watch mode
pnpm --filter v2 run test:coverage    # Vitest with coverage

# E2E tests (requires built preview server)
pnpm preview   # Start preview server
pnpm test      # Run Playwright e2e tests (expects server on :8989)
pnpm e2e       # Build + start preview + run e2e tests
```
