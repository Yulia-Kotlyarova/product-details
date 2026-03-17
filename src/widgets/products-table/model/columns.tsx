import type { ColumnDef } from '@tanstack/react-table';

import type { Product } from '@/entities/product';
import type {
  ProductSortField,
  ProductSorting,
} from '@/features/product-sorting';

type CreateColumnsParams = {
  sorting: ProductSorting;
  onSort: (field: ProductSortField) => void;
};

const getSortMark = (
  field: ProductSortField,
  sorting: ProductSorting,
): string => {
  if (sorting.sortBy !== field) {
    return '';
  }

  if (sorting.order === 'asc') {
    return ' ↑';
  }

  if (sorting.order === 'desc') {
    return ' ↓';
  }

  return '';
};

export const createColumns = ({
                                sorting,
                                onSort,
                              }: CreateColumnsParams): ColumnDef<Product>[] => [
  {
    accessorKey: 'title',
    header: () => (
      <button type="button" onClick={() => onSort('title')}>
        Наименование{getSortMark('title', sorting)}
      </button>
    ),
    cell: ({ row }) => row.original.title,
  },
  {
    accessorKey: 'price',
    header: () => (
      <button type="button" onClick={() => onSort('price')}>
        Цена{getSortMark('price', sorting)}
      </button>
    ),
    cell: ({ row }) => row.original.price,
  },
  {
    accessorKey: 'rating',
    header: () => (
      <button type="button" onClick={() => onSort('rating')}>
        Рейтинг{getSortMark('rating', sorting)}
      </button>
    ),
    cell: ({ row }) => row.original.rating,
  },
];
