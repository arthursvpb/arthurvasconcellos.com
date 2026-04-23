import { ArrowUpRight } from 'lucide-react';

interface ElsewhereLink {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const links: ElsewhereLink[] = [
  {
    label: 'GitHub',
    value: 'arthursvpb',
    href: 'https://github.com/arthursvpb',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'in/arthursvpb',
    href: 'https://www.linkedin.com/in/arthursvpb/',
    external: true,
  },
  {
    label: 'Email',
    value: 'contato@arthurvasconcellos.com',
    href: 'mailto:contato@arthurvasconcellos.com',
  },
];

export function Elsewhere() {
  return (
    <ul className="divide-border border-border divide-y border-y">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer noopener' : undefined}
            className="group flex items-center justify-between gap-4 py-5 transition-colors sm:py-6"
          >
            <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="text-muted-foreground w-24 font-mono text-[0.7rem] tracking-[0.1em] uppercase">
                {link.label}
              </span>
              <span className="text-foreground group-hover:text-accent text-base tracking-tight transition-colors">
                {link.value}
              </span>
            </span>
            <ArrowUpRight
              className="text-muted-foreground group-hover:text-accent size-4 transition-colors"
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
