import { useEffect, useState } from 'react';
import type { SortingState } from '@tanstack/react-table';

import { getStorageItem, setStorageItem } from '../browser/storage';

export const usePersistentSorting = (storageKey: string) => {
  const [sorting, setSorting] = useState<SortingState>(() =>
    getStorageItem<SortingState>(storageKey, [])
  );

  useEffect(() => {
    setStorageItem(storageKey, sorting);
  }, [storageKey, sorting]);

  return { sorting, setSorting };
};
