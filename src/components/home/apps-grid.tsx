import { ArrowUpRight, Github } from 'lucide-react';
import { personalApps, type AppStatus } from '@/lib/apps-registry';

const statusCopy: Record<AppStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  soon: 'Soon',
};

export function AppsGrid() {
  // Single card looks lopsided in a 2-col grid. Only split to 2 cols once we
  // have something to fill the second slot.
  const gridCols = personalApps.length >= 2 ? 'sm:grid-cols-2' : 'grid-cols-1';
  return (
    <ul
      className={`border-border grid grid-cols-1 gap-px border bg-[color:var(--av-hair)] ${gridCols}`}
    >
      {personalApps.map((app, index) => {
        const number = String(index + 1).padStart(2, '0');
        const isInteractive = app.status !== 'soon';
        return (
          <li key={app.slug} className="bg-card">
            <div className="group flex h-full min-h-[240px] flex-col p-8">
              <div className="text-muted-foreground flex items-center justify-between font-mono text-[0.7rem] tracking-[0.1em] uppercase">
                <span>{number}</span>
                <span>{statusCopy[app.status]}</span>
              </div>
              <div className="mt-10 flex flex-col gap-2">
                <h3 className="text-foreground text-xl leading-tight font-medium tracking-[-0.01em]">
                  {app.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {app.description}
                </p>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-6 pt-10">
                {isInteractive && (
                  <a
                    href={app.href}
                    className="text-muted-foreground hover:text-accent focus-visible:text-accent inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors"
                  >
                    <span>Open</span>
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                )}
                <a
                  href={app.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-foreground hover:text-accent focus-visible:text-accent inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors"
                >
                  <Github className="size-3.5" aria-hidden />
                  <span>Source</span>
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
