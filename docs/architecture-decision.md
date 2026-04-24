# ADR-002 - Subdomain Federation for AV LABS Apps

Status: Accepted
Date: 2026-04-24
Owner: Arthur Vasconcellos
Supersedes: ADR-001 (single-repo host with feature modules)

## Context

Initial approach (ADR-001) consolidated every personal app into this single
Next.js repo. Invoice moved from `arthursvpb/invoice-generator` into
`src/features/invoice/`. That optimised for one-line deploys at the cost of
per-app GitHub visibility (stars, READMEs, issue trackers, standalone deploy
history).

New requirement: each app must remain a first-class GitHub project - its own
repo, own Vercel deploy, own public-facing existence. But the apps still read
as "under the AV LABS roof" to visitors, not as random scattered projects.

## Decision

**Subdomain federation.**

- `arthurvasconcellos.com` - the host. Homepage only. Lists the apps via
  `src/lib/apps-registry.ts` and links to each one.
- `<slug>.arthurvasconcellos.com` - each app. Own GitHub repo, own Vercel
  project, independent deploy, independent PWA, independent analytics.
- Example: `invoice.arthurvasconcellos.com` is the invoice generator, sourced
  from `arthursvpb/invoice-generator`.

DNS does the routing. No Vercel rewrites. No Next.js `basePath`. No multi-zone
stitching. Each subdomain is its own origin.

Brand consistency comes from a shared token + component set. V1 duplicates the
brand files across repos with a sync doc. When a second app arrives, extract to
an npm package (`@arthursvpb/av-labs`).

## Rejected Alternatives

### A. Path federation (`arthurvasconcellos.com/invoice`)
Architecturally equivalent in intent but requires `basePath` in every sub-app,
asset proxying through Vercel rewrites, and a careful PWA-scope story across
origins. For marginal URL-aesthetic gain. Rejected.

### B. Single-repo host with feature modules (ADR-001)
Was the right call when the goal was minimal infra. Wrong now that per-app
GitHub visibility is a stated requirement. Superseded.

### C. Monorepo with pnpm workspaces + two deploys
Solves per-deploy isolation but keeps apps in one GitHub repo. Fails the
visibility requirement. Rejected.

### D. Git submodules
Hostile to Vercel's Git integration, painful for contributors, no meaningful
upside for a solo maintainer.

## Consequences

Positive

- Each app has its own GitHub repo with its own stars, traffic, README,
  issues, and deploy history.
- No `basePath` gymnastics, no rewrite latency, no cross-origin PWA quirks.
  Each app is a standalone origin that behaves like any normal website.
- The host repo is tiny and static. Deploys in seconds. No surface area.
- Adding a new app is a clean procedure: new GitHub repo, new Vercel project,
  new DNS record, one entry in `apps-registry.ts`.

Negative / Trade-offs

- Brand drifts across N repos unless explicitly synced. V1 uses duplication +
  a sync doc; upgrade to a shared npm package at app #2.
- N deploys instead of 1. Each app has its own release cadence. More repos to
  update dependencies on. Real cost, acceptable at this scale.
- Navigation from `arthurvasconcellos.com` to `invoice.arthurvasconcellos.com`
  is a full page load (different origins). Not a bug - that's how subdomains
  work - but different from a SPA.
- Each app's PWA install is scoped to its own subdomain. Users install from
  `invoice.arthurvasconcellos.com`, not from the host.

## When to promote to a shared package

Trigger: second app added. Two repos drifting is manageable; three will not
be. Extract at app #2.

Plan when that time comes: create `arthursvpb/av-labs-brand`, publish to npm
(public MIT), each app installs it, delete inline copies. Half-day of work.

## Host repo surface (this repo)

```
src/
  app/
    layout.tsx          Shell: fonts, theme, site header/footer
    page.tsx            Homepage: hero, Personal Apps grid, Elsewhere
    globals.css         Tailwind v4 @theme + AV LABS tokens
    robots.ts           SEO
    sitemap.ts          SEO (host-only; each app publishes its own)
    error.tsx           Root error boundary
    not-found.tsx       Branded 404
  components/
    brand/              Wordmark, Monogram (shared with each app)
    home/               Hero, SectionHeading, AppsGrid, Elsewhere
    layout/             Header, Footer (host-scoped)
    theme-provider.tsx  next-themes wiring
    theme-toggle.tsx
  lib/
    apps-registry.ts    Single source of truth for app cards
    utils.ts            cn() helper
  styles/
    tokens.css          AV LABS palette (hex + oklch)
```

No invoice code here. No PDF generation. No shadcn primitives. No PWA. Just
a linktree-grade homepage + apps registry.
