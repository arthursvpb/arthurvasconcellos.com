'use client';

import * as React from 'react';
import { useDraftStore } from '@/features/invoice/store/draft-store';
import { useSettingsStore } from '@/features/invoice/store/settings-store';

export function StoreHydrator() {
  React.useEffect(() => {
    void Promise.allSettled([
      Promise.resolve(useDraftStore.persist.rehydrate()),
      Promise.resolve(useSettingsStore.persist.rehydrate()),
    ]).then(() => {
      if (typeof document !== 'undefined') {
        document.body.dataset.hydrated = 'true';
      }
    });
  }, []);
  return null;
}
