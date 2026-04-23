'use client';

import { useFormContext } from 'react-hook-form';
import { SectionCard, FieldRow } from '@/features/invoice/components/form-field';
import { Textarea } from '@/components/ui/textarea';
import { useT } from '@/features/invoice/lib/i18n/use-t';

export function NotesSection() {
  const { register } = useFormContext();
  const t = useT();
  const copy = t.fields.notes;

  return (
    <SectionCard title={t.sections.notes.title} description={t.sections.notes.description}>
      <FieldRow name="notes" label={copy.label} hint={copy.hint}>
        <Textarea id="notes" rows={4} placeholder={copy.placeholder} {...register('notes')} />
      </FieldRow>
    </SectionCard>
  );
}
