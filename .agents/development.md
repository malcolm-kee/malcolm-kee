# Development

All commands run from the repo root unless noted.

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
