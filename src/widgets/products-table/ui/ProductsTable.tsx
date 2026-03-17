import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';

import type { Product } from '@/entities/product';
import styles from './ProductsTable.module.css';

import { productsColumns } from './columns';

type ProductsTableProps = {
  products: Product[];
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
};

export const ProductsTable = ({
                                products,
                                sorting,
                                onSortingChange,
                              }: ProductsTableProps) => {
  const table = useReactTable({
    data: products,
    columns: productsColumns,
    state: {
      sorting,
    },
    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === 'function' ? updater(sorting) : updater;

      onSortingChange(nextSorting);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className={styles.table}>
      <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className={styles.headCell}>
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sortDirection = header.column.getIsSorted();

            return (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className={styles.headCell}
                style={{
                  cursor: canSort ? 'pointer' : 'default',
                  textAlign: header.column.columnDef.meta?.isNumeric
                    ? 'right'
                    : 'left',
                  userSelect: 'none',
                }}
              >
                  <span>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </span>

                {canSort && (
                  <span style={{ marginLeft: 8 }}>
                      {sortDirection === 'asc' && '↑'}
                    {sortDirection === 'desc' && '↓'}
                    {sortDirection === false && '↕'}
                    </span>
                )}
              </th>
            );
          })}
        </tr>
      ))}
      </thead>

      <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr className={styles.row} key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className={styles.bodyCell}
              style={{
                textAlign: cell.column.columnDef.meta?.isNumeric
                  ? 'right'
                  : 'left',
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
};
