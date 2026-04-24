# Adding a Personal App

Three steps. Under 10 minutes for a "hello" skeleton.

## 1. Register the app

Edit `src/lib/apps-registry.ts`:

```ts
export const personalApps: PersonalApp[] = [
  { slug: 'invoice', name: 'Invoice Generator', description: '...', href: '/invoice', status: 'live' },
  // Append your new app:
  {
    slug: 'todo',
    name: 'Todo',
    description: 'Keyboard-driven todo list, local-first.',
    href: '/todo',
    status: 'beta',
  },
];
```

`status` controls the Personal Apps grid card:
- `live` - card is an active link.
- `beta` - card is an active link with "Beta" badge (identical behavior; signals maturity).
- `soon` - card renders dimmed and unclickable.

## 2. Create the route

Thin wrappers at `src/app/<slug>/`:

```tsx
// src/app/todo/page.tsx
import type { Metadata } from 'next';
import { TodoApp } from '@/features/todo';

export const metadata: Metadata = {
  title: 'Todo',
  description: 'Keyboard-driven todo list, local-first.',
};

export default function TodoPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <TodoApp />
    </section>
  );
}
```

If the feature needs its own cross-cutting wiring (store hydration, persistence banner, lang toggle), add `src/app/<slug>/layout.tsx`:

```tsx
// src/app/todo/layout.tsx
import { StoreHydrator } from '@/features/todo';

export default function TodoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHydrator />
      {children}
    </>
  );
}
```

## 3. Create the feature module

`src/features/<slug>/` owns everything the feature needs:

```
src/features/todo/
├── components/
│   └── todo-app.tsx        // the main UI
├── lib/
│   └── ...                 // domain logic, types, persistence
├── store/
│   └── todo-store.ts       // zustand, if needed
├── store-hydrator.tsx      // optional: rehydrate persisted stores
└── index.ts                // public surface
```

`index.ts` is the only file consumed from outside the feature:

```ts
// src/features/todo/index.ts
export { TodoApp } from './components/todo-app';
export { StoreHydrator } from './store-hydrator';
```

## Rules

- **Feature isolation.** Nothing outside `src/features/<slug>/` imports `src/features/<slug>/components/*` or `src/features/<slug>/lib/*`. Route files and other features only consume the public surface via `@/features/<slug>`.
- **Shared primitives live in `src/components/ui/*`.** shadcn primitives (Button, Input, Dialog, ...) are shared. Extend them in place; do not fork inside a feature.
- **Shared brand lives in `src/components/brand/*`.** Wordmark, Monogram, Symbol. Reuse these; do not redraw.
- **Shared utilities live in `src/lib/*`.** `cn`, `apps-registry`, cross-feature helpers only. Anything invoice-specific goes under `src/features/invoice/lib/*`, not `src/lib/`.
- **Tokens are the contract.** Compose from Tailwind tokens (`bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, `ring-accent`). Only use the raw `var(--av-*)` palette when a brand-fixed color is required (e.g. the Wordmark's LABS span).
- **No new top-level state.** Each feature owns its zustand store under `src/features/<slug>/store/`. Global state is a smell; if two features truly share state, they are the same feature.

## Verify

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e             # if you added E2E coverage
```

All green → merge → Vercel serves `/your-slug` alongside `/invoice` and everything else.

## What you do NOT need to do

- No new Vercel project. Same deploy.
- No new PWA manifest. Scope `/` already covers your route.
- No new Tailwind config. Inherits from the site.
- No new favicon set. Inherits the AV monogram.
- No rewrites, no `basePath`, no multi-zone. Next App Router handles subpath routing natively.
