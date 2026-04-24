import { Hero } from '@/components/home/hero';
import { SectionHeading } from '@/components/home/section-heading';
import { AppsGrid } from '@/components/home/apps-grid';
import { Elsewhere } from '@/components/home/elsewhere';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          num="01"
          title="Personal apps."
          description="Small tools I use often. Each one solves a specific friction in my day - local-first, offline-friendly, no accounts."
        />
        <AppsGrid />
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading num="02" title="Elsewhere." />
        <Elsewhere />
      </section>
    </>
  );
}
