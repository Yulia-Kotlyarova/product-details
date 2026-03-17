import { usePersistentSorting } from '@/shared/lib/table/usePersistentSorting';
import { type ProductSorting } from '../types';


const PRODUCT_SORTING_STORAGE_KEY = 'products-sorting';

const DEFAULT_PRODUCT_SORTING: ProductSorting = {
  sortBy: null,
  order: null,
};

export const useProductSorting = () => {
  return usePersistentSorting<ProductSorting>({
    storageKey: PRODUCT_SORTING_STORAGE_KEY,
    defaultValue: DEFAULT_PRODUCT_SORTING,
  });
};
