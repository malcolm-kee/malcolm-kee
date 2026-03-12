# Architecture

**Monorepo** using pnpm workspaces:

- `apps/v2/` — Main Astro website (malcolmkee.com)
- `libs/helpers/` — `@mkee/helpers` utility library
- `libs/extract-html-resources/` — HTML resource extraction for service worker
- `libs/lox/` — Custom `lox` CLI (language interpreter)
- `e2e/` — Playwright end-to-end tests

**Main app stack:** Astro 5 + React 19 + Tailwind CSS + TypeScript (strict mode)

**Deployment:** Netlify. Site URL is `https://malcolmkee.com`, dev/preview port is `8989`.

**CI/CD:** GitHub Actions (`.github/workflows/`):

- `build.yml` — Build, deploy, and run unit tests
- `playwright.yml` — Run Playwright e2e tests
