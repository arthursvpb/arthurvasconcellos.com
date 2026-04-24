# ADR-001 - AV LABS Personal Site + Apps Architecture

Status: Proposed
Date: 2026-04-22
Owner: Arthur Vasconcellos

## Context

Two live repos, both on personal GitHub:

- `arthursvpb/arthurvasconcellos.com` - Next.js 14 / React 18 / Tailwind 3 / Yarn / Node 18+. 5 source files. Effectively a linktree.
- `arthursvpb/invoice-generator` - Next.js 15 / React 19 / Tailwind 4 / pnpm / Node 22+. ~60 source files, shadcn primitives, Serwist PWA, `@react-pdf/renderer`, zustand, react-hook-form, zod, vitest + playwright, custom i18n (pt-BR/en), `.av-code/` profile already deployed.

Goal: `arthurvasconcellos.com/` is the homepage; `arthurvasconcellos.com/invoice` is the invoice generator; future personal apps mount under `arthurvasconcellos.com/{slug}`; all under the new AV LABS brand; easy to maintain for years by one person on Vercel.

Deep research proposed a "monorepo or unified repo" with route-based splitting. That direction is correct; the framing is under-specified and one trade-off it lists (bundle size, green-to-blue accent) is either already solved by Next App Router or cosmetic. Repo reality makes the choice sharper than the research suggests: the homepage is essentially disposable; the invoice app is the mature codebase. The architecture should be driven by that asymmetry, not by treating both repos as equal peers to "merge."

## Decision

**Single Next.js 15 App Router host in the `arthurvasconcellos.com` repo.** Invoice becomes a feature module mounted at `/invoice`. Future apps become sibling feature modules under `/slug`. One deployment, one design system, one PWA.

Concretely:

- Keep the **repo name** `arthurvasconcellos.com` (matches domain, preserves Vercel project + DNS).
- **Upgrade that repo's stack in place** to match invoice-generator (Next 15, React 19, Tailwind 4, pnpm, Node 22).
- **Copy invoice code** into the repo and organise it under `src/features/invoice/` with a thin route wrapper at `src/app/invoice/page.tsx`.
- **Archive** `arthursvpb/invoice-generator` on GitHub. Its git history is preserved there, read-only.
- **Re-skin** everything using the AV LABS tokens (`Ink / Graphite / Steel / Mist / Paper / Axis`), General Sans + JetBrains Mono, and the AV wordmark + monogram.

## Rejected Alternatives

### A. Monorepo with Turborepo (`apps/web` + `apps/invoice` + `packages/ui` + `packages/config`)

Rejected.

- Solves a problem you do not have: independent deploy cadence, independent runtime, independent ownership. Single maintainer + single Vercel project + shared brand = no pressure.
- Adds: workspace config, package scoping, build orchestration cache, shared-package publishing nuances, separate `tsconfig`s, per-app Vercel projects or root-dir wiring.
- Worth revisiting **only** when one app needs a separate runtime (Edge vs Node), a separate auth boundary, or a separate deploy cadence.

### B. Next.js Multi-Zones

Rejected.

- Built to stitch two large, independent Next.js apps at the platform layer (classic case: marketing site + logged-in product). Fragments PWA scope, breaks seamless client-side navigation across zones, doubles CI.
- For a linktree + one form app, this is industrial machinery on a kitchen table.

### C. Multi-repo kept, Vercel rewrites for `/invoice`

Rejected.

- Works, but duplicates Tailwind config, duplicates fonts, duplicates UI primitives, duplicates root layout, duplicates metadata, and splits the PWA.
- Every new app N-plies the drift: any brand change is 2 PRs, 3 PRs, 4 PRs.
- Rewrites are a legitimate tool for external/legacy services, not for apps you own and want to brand consistently.

### D. Iframe or external link-out

Rejected. Breaks single-site feel and PWA continuity. The deep research correctly dismissed this; restating for completeness.

## Consequences

Positive

- New app in future = `src/app/<slug>/page.tsx` + `src/features/<slug>/` + one line in `src/lib/apps-registry.ts`. No infra.
- One Tailwind config, one root layout, one PWA scope, one deployment, one Vercel project.
- Next.js App Router splits bundles per route automatically - the homepage does not pay for the invoice bundle.
- Brand tokens live in one file. Drift becomes a code-review concern, not an infra concern.

Negative / Trade-offs

- All apps share one Node runtime, one set of dependencies, one build. If one app eventually wants a radically different runtime or release cadence, it will have to move out. That is a future problem with a clear trigger, not a current one.
- Invoice git history lives in the archived repo, not in the merged history. Mitigation: keep the archived repo read-only; reference it from this repo's README.
- PWA scope widens from `/invoice` to `/`. Users who installed the standalone invoice PWA must reinstall from the new site. Acceptable; audience is very small.

## Why this matches repo reality

- The homepage is 5 files with zero meaningful code. Preserving it adds nothing and blocks a cleaner rebuild.
- The invoice-generator has all the infrastructure we want: Tailwind 4, shadcn, Serwist, testing, `.av-code/`. Rebuilding that infra in the homepage repo would be pointless. Copy it.
- The invoice app already serves `/invoice` as its real route and redirects `/` to it. Removing the redirect and replacing the root with the homepage is a one-file change.
- `components.json` + `shadcn/ui` + Tailwind v4 `@theme inline` directly accept the AV LABS palette as OKLCH tokens. No framework friction.

## av-code alignment

- Prefer pnpm (invoice already does). Drop Yarn from the homepage repo.
- `.av-code/AGENTS.md` profile is already deployed in invoice-generator; re-deploy the `personal` profile to the merged repo.
- Conventions: KISS, no em-dashes in source, no Co-Authored-By trailers, no unnecessary abstractions, smallest durable architecture. This decision follows all of them.
