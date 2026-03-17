import type { ColumnDef } from '@tanstack/react-table';

import type { Product } from '@/entities/product';

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'title',
    header: 'Наименование',
    cell: ({ row }) => row.original.title,
  },
  {
    accessorKey: 'vendor',
    header: 'Вендор',
    cell: ({ row }) => row.original.vendor,
  },
  {
    accessorKey: 'sku',
    header: 'Артикул',
    cell: ({ row }) => row.original.sku,
  },
  {
    accessorKey: 'rating',
    header: 'Оценка',
    cell: ({ row }) => {
      const rating = row.original.rating;

      return (
        <span
          style={{
            color: rating < 3 ? 'red' : undefined,
            fontWeight: rating < 3 ? 700 : 400,
          }}
        >
          {rating}
        </span>
      );
    },
    sortingFn: 'basic',
    meta: {
      isNumeric: true,
    },
  },
  {
    accessorKey: 'price',
    header: 'Цена',
    cell: ({ row }) => `$${row.original.price}`,
    sortingFn: 'basic',
    meta: {
      isNumeric: true,
    },
  },
  {
    accessorKey: 'stock',
    header: 'Количество',
    cell: ({ row }) => row.original.stock,
    sortingFn: 'basic',
    meta: {
      isNumeric: true,
    },
  },
];
