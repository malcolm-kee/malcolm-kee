# AGENTS.md

Personal website and blog for malcolmkee.com — Astro 5 + React 19 + TypeScript monorepo.

**Package manager:** pnpm

```bash
pnpm dev                    # Start dev server (port 8989)
pnpm --filter v2 run build  # Build (runs astro check + tsc + astro build)
pnpm --filter v2 run check  # Type check only
```

## More details

- [Architecture](.agents/architecture.md) — monorepo structure, deployment
- [Content](.agents/content.md) — content collections, MDX features
- [Development](.agents/development.md) — full command reference, formatting, testing
