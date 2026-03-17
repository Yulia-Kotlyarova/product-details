import type { SortingState } from '@tanstack/react-table';

export const PRODUCTS_SORTING_STORAGE_KEY = 'products-sorting';

export const getInitialProductsSorting = (): SortingState => {
  const rawValue = localStorage.getItem(PRODUCTS_SORTING_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    return JSON.parse(rawValue) as SortingState;
  } catch {
    return [];
  }
};
