import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pt-24 pb-24 sm:px-6 sm:pt-32 lg:px-8">
      <p className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.14em] uppercase">
        Error 404
      </p>
      <h1 className="text-foreground max-w-[22ch] text-4xl leading-[1.05] font-medium tracking-[-0.02em] sm:text-5xl lg:text-6xl">
        Page not found.{' '}
        <span className="text-muted-foreground font-normal">
          The route you asked for does not exist on this host.
        </span>
      </h1>
      <div className="flex flex-wrap items-center gap-6">
        <Link
          href="/"
          className="hover:text-accent font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors"
        >
          &larr; Back to home
        </Link>
        <Link
          href="/invoice"
          className="hover:text-accent font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors"
        >
          Invoice generator
        </Link>
      </div>
    </section>
  );
}
