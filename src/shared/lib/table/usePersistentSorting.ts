import { useEffect, useState } from 'react';

import { getStorageItem, setStorageItem } from '@/shared/lib/browser/storage';
import type { ProductSorting } from '@/features/product-sorting';

import type { SortingState } from '@tanstack/react-table';

export const usePersistentSorting = (storageKey: string) => {
  const [sorting, setSorting] = useState<SortingState>(() =>
    getStorageItem<SortingState>(storageKey, [])
  );

  useEffect(() => {
    setStorageItem(storageKey, sorting);
  }, [storageKey, sorting]);

  return { sorting, setSorting };
};

export const usePersistentProductSorting = (
  storageKey: string,
  defaultValue: ProductSorting,
) => {
  const [sorting, setSorting] = useState<ProductSorting>(() =>
    getStorageItem<ProductSorting>(storageKey, defaultValue),
  );

  useEffect(() => {
    setStorageItem(storageKey, sorting);
  }, [storageKey, sorting]);

  return { sorting, setSorting };
};
