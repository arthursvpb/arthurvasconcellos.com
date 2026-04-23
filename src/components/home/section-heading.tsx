import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  num: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ num, title, description, className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'grid gap-6 pb-10 sm:grid-cols-[120px_1fr] sm:gap-10 sm:pb-12',
        className,
      )}
    >
      <div className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.1em] uppercase sm:pt-2">
        {num} - {title.replace(/\.$/, '')}
      </div>
      <div>
        <h2 className="text-foreground max-w-[22ch] text-2xl leading-tight font-normal tracking-[-0.02em] sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground mt-3 max-w-[64ch] text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
