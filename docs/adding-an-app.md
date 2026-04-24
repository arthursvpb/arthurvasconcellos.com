# Adding a Personal App

Subdomain federation. Each app is its own GitHub repo, its own Vercel deploy,
its own subdomain. No code in this host repo beyond a registry entry.

Target for an app called `todo`: ~30-45 minutes, most of it Vercel + DNS.

## Prereqs

- The app is built and deployed somewhere (locally or on a Vercel preview).
- You have control of DNS for `arthurvasconcellos.com`.

## 1. Create the GitHub repo

`arthursvpb/<slug>` (e.g. `arthursvpb/todo`). Public. MIT license. Add a README
with a top banner:

```markdown
> Live at https://<slug>.arthurvasconcellos.com - part of AV LABS.
```

## 2. Ship the app with AV LABS brand

Copy these from `arthurvasconcellos.com`:

```
src/styles/tokens.css
src/components/brand/wordmark.tsx
src/components/brand/monogram.tsx
public/fonts/general-sans/*.woff2
public/icons/icon.svg
public/icons/favicon-32.png
public/icons/apple-touch-icon.png
scripts/refresh-general-sans.sh
```

Wire the fonts + tokens into the app's `globals.css` and `layout.tsx`
(see the host's files for the exact incantation).

In the app's `layout.tsx` metadata, set the canonical URL to
`https://<slug>.arthurvasconcellos.com`.

## 3. Create the Vercel project

- New project on Vercel from the GitHub repo.
- Node 22.x, pnpm auto-detected, Next.js preset.
- Wait for the first deploy to `<something>.vercel.app`.

## 4. Attach the subdomain

**Vercel side:**

- Project -> Settings -> Domains -> Add Domain
- Type `<slug>.arthurvasconcellos.com`
- Vercel shows the DNS record you need to add.

**DNS side:**

- At your registrar, add a CNAME:
  - Name: `<slug>`
  - Value: `cname.vercel-dns.com` (or whatever Vercel shows)
  - TTL: default
- Wait for DNS propagation (usually <5 min). Vercel auto-issues the SSL cert
  once the CNAME resolves.

## 5. Register on the homepage

Append to `arthurvasconcellos.com`'s `src/lib/apps-registry.ts`:

```ts
{
  slug: 'todo',
  name: 'Todo',
  description: 'Keyboard-driven todo list, local-first.',
  href: 'https://todo.arthurvasconcellos.com',
  repo: 'https://github.com/arthursvpb/todo',
  status: 'beta',
},
```

Commit, push, merge. Homepage auto-updates.

## Rules

- **Brand is shared.** Copy the brand files from the host repo; don't redraw.
  When a second app exists, extract to an npm package.
- **`status: 'soon'`** renders the card dimmed and unclickable. Use for apps
  not yet deployed. `live` and `beta` are both clickable.
- **Each app owns its PWA** (if it has one). Scope is the subdomain. Users
  install from the subdomain, not from the host.
- **Each app publishes its own `sitemap.xml` and `robots.txt`** at its own
  origin. The host sitemap only lists `/`.

## What you do NOT need to do

- No monorepo tooling. No pnpm workspaces.
- No Next.js `basePath`. No Vercel rewrites. No multi-zone.
- No reverse proxy. DNS does the routing.
- No shared lockfile. Each repo has its own.
