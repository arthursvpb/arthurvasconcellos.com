<div align="center">
  <img width="64" src="./public/icons/icon.svg" alt="AV LABS monogram" />
  <h1>arthurvasconcellos.com</h1>
  <p>Personal site by Arthur Vasconcellos - AV LABS.</p>
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

This repo is the **host** for arthurvasconcellos.com: a small, restrained
homepage that lists personal apps under the AV LABS brand.

Each personal app lives in **its own GitHub repo** and deploys to **its own
subdomain** of `arthurvasconcellos.com`. See [ADR-002](./docs/architecture-decision.md)
for why.

- `arthurvasconcellos.com` - this repo. Homepage + Personal Apps grid + Elsewhere.
- `invoice.arthurvasconcellos.com` - [Invoice Generator](https://github.com/arthursvpb/invoice-generator).
  Local-first invoice and cancellation PDFs for contractors.

## Stack

- **Framework** - Next.js 15 App Router, React 19, TypeScript (strict)
- **Styling** - Tailwind v4, AV LABS design tokens, General Sans + JetBrains Mono (self-hosted)
- **Themes** - next-themes (system / light / dark)
- **Testing** - Vitest (apps-registry invariants)
- **Tooling** - pnpm, ESLint flat config, Prettier, GitHub Actions CI

No shadcn primitives here; no PWA on the host; no PDF generation here; no zustand.
Every app that needs any of that carries it in its own repo.

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
pnpm test           # vitest run (4 tests, apps-registry invariants)
pnpm build          # next build
pnpm format         # prettier --write .

bash scripts/refresh-general-sans.sh   # re-download General Sans WOFF2
```

## Adding a new app

Three steps: create a new GitHub repo, attach a subdomain, append one entry
to `src/lib/apps-registry.ts`. Full recipe: [`docs/adding-an-app.md`](./docs/adding-an-app.md).

## Architecture

- [`ARCHITECTURE_DECISION.md`](./docs/architecture-decision.md) - ADR-002, subdomain
  federation. Explains why this host stays tiny.
  phase by phase (superseded by ADR-002 but kept for history).

## License

MIT. See [LICENSE.md](./LICENSE.md).
