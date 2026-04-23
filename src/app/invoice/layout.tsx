import { StoreHydrator } from '@/features/invoice';

export default function InvoiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHydrator />
      {children}
    </>
  );
}
