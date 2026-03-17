import { usePersistentProductSorting } from '@/shared/lib/table/usePersistentSorting';
import { type ProductSorting } from '../types';


const PRODUCT_SORTING_STORAGE_KEY = 'products-sorting';

export const DEFAULT_PRODUCT_SORTING: ProductSorting = {
  sortBy: null,
  order: null,
};

export const useProductSorting = () => {
  return usePersistentProductSorting(
    PRODUCT_SORTING_STORAGE_KEY,
    DEFAULT_PRODUCT_SORTING,
  );
};
