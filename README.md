<div align="center">
  <img width="64" src="./public/icons/icon-192.png" alt="AV LABS monogram" />
  <h1>arthurvasconcellos.com</h1>
  <p>Personal site and apps by Arthur Vasconcellos - AV LABS.</p>
</div>

<p align="center">
  <a href="#project">Project</a> &nbsp;·&nbsp;
  <a href="#stack">Stack</a> &nbsp;·&nbsp;
  <a href="#running">Running</a> &nbsp;·&nbsp;
  <a href="#adding-a-new-app">Adding a new app</a> &nbsp;·&nbsp;
  <a href="#license">License</a>
</p>

<p align="center">
  <img alt="Build status" src="https://github.com/arthursvpb/arthurvasconcellos.com/actions/workflows/ci.yml/badge.svg">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=0A0A0B&labelColor=6B6E76">
</p>

## Project

Single Next.js host serving the personal homepage at `/` and personal apps at `/<slug>`. One repo, one deploy, one PWA, one design system - scoped by route, not by project. Future apps slot in as feature modules.

- `/` - AV LABS linktree, "Personal Apps" grid, social links.
- `/invoice` - [Invoice Generator](./docs/adding-an-app.md): local-first invoice and cancellation PDFs for contractors. Offline-capable. Previously lived in its own repo (`arthursvpb/invoice-generator`, archived).

Design system documented in `ARCHITECTURE_DECISION.md`. Adding a new app: see [`docs/adding-an-app.md`](./docs/adding-an-app.md).

## Stack

- **Framework** - Next.js 15 (App Router), React 19, TypeScript, strict mode
- **Styling** - Tailwind v4, shadcn primitives, AV LABS design tokens, General Sans + JetBrains Mono (self-hosted)
- **State** - zustand for invoice drafts and settings (per-feature)
- **Forms & validation** - react-hook-form + zod, big.js for decimal math
- **PDF** - `@react-pdf/renderer` with locally bundled fonts
- **PWA** - Serwist service worker, scope `/`, AV monogram icon set
- **Testing** - Vitest + Testing Library (76 unit tests), Playwright (68 scenarios, headless Chromium)
- **Tooling** - pnpm, ESLint flat config, Prettier, GitHub Actions CI

## Running

Prerequisites: Node 22+, pnpm.

```sh
git clone https://github.com/arthursvpb/arthurvasconcellos.com.git
cd arthurvasconcellos.com
pnpm install
pnpm dev            # http://localhost:3000
```

### Scripts

```sh
pnpm typecheck      # tsc --noEmit
pnpm lint           # eslint .
pnpm test           # vitest run
pnpm build          # next build (generates public/sw.js for PWA)
pnpm e2e            # playwright test (runs its own dev server on 3210)
pnpm e2e:ui         # playwright in UI mode
pnpm format         # prettier --write .

node scripts/generate-icons.mjs            # regenerate PWA PNG set from AV monogram SVG
bash scripts/refresh-general-sans.sh        # re-download General Sans WOFF2 from Fontshare
```

## Adding a new app

Three steps, under 10 minutes to a "hello" skeleton: append to `src/lib/apps-registry.ts`, create `src/app/<slug>/page.tsx`, create `src/features/<slug>/`. Full recipe: [`docs/adding-an-app.md`](./docs/adding-an-app.md).

## Architecture

- [`ARCHITECTURE_DECISION.md`](./docs/architecture-decision.md) - why single Next.js host, not monorepo/multi-zone/multi-repo

## History

- `arthursvpb/arthurvasconcellos.com` (this repo) - production host since 2023; v2.0 (Apr 2026) unified with the invoice generator.
- `arthursvpb/invoice-generator` - archived April 2026. Original home of `src/features/invoice/`; see its git log for the invoice-specific commit history.

## License

MIT. See [LICENSE.md](./LICENSE.md).
