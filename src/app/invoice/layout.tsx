import { StoreHydrator } from '@/features/invoice';
import { LanguageToggle } from '@/features/invoice/components/language-toggle';

export default function InvoiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHydrator />
      <div className="border-border bg-background/40 border-b">
        <div className="mx-auto flex h-10 max-w-3xl items-center justify-end px-4">
          <LanguageToggle />
        </div>
      </div>
      {children}
    </>
  );
}
