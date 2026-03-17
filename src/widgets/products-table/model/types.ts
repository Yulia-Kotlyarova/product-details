import type { SortingState } from '@tanstack/react-table';

import type { Product } from '@/entities/product';
import type {
  ProductSorting,
  ProductSortField,
} from '@/features/product-sorting';

export type ProductsTableProps = {
  products: Product[];
  isLoading: boolean;
  errorMessage: string | null;
  sorting: SortingState;
  activeSorting: ProductSorting;
  onSort: (field: ProductSortField) => void;
};
