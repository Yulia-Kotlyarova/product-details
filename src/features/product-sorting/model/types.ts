export type ProductSortField = 'title' | 'price' | 'rating' | null;

export type ProductSorting = {
  sortBy: ProductSortField;
  order: 'asc' | 'desc' | null;
};
