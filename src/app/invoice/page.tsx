import type { Metadata } from 'next';
import { InvoiceForm } from '@/features/invoice';

export const metadata: Metadata = {
  title: 'Invoice Generator',
  description:
    'Local-first invoice and cancellation generator for contractors. Offline-capable, no backend, your data stays on your device.',
};

export default function InvoicePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <InvoiceForm />
    </section>
  );
}
