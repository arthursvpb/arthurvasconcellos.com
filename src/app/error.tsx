'use client';

import * as React from 'react';
import Link from 'next/link';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('[root-error]', {
      name: error.name,
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pt-24 pb-24 sm:px-6 sm:pt-32 lg:px-8">
      <p className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.14em] uppercase">
        Unexpected error
      </p>
      <h1 className="text-foreground max-w-[22ch] text-4xl leading-[1.05] font-medium tracking-[-0.02em] sm:text-5xl lg:text-6xl">
        Something went sideways.{' '}
        <span className="text-muted-foreground font-normal">
          Reloading the page usually clears it up.
        </span>
      </h1>
      <div className="flex flex-wrap items-center gap-6">
        <button
          type="button"
          onClick={reset}
          className="hover:text-accent font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors"
        >
          Retry
        </button>
        <Link
          href="/"
          className="hover:text-accent font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors"
        >
          Back to home
        </Link>
      </div>
      {error.digest && (
        <details className="text-muted-foreground text-xs">
          <summary className="cursor-pointer font-mono tracking-[0.1em] uppercase">
            Technical reference
          </summary>
          <p className="mt-2 font-mono break-all">digest: {error.digest}</p>
        </details>
      )}
    </section>
  );
}
