export type Product = {
  id: number;
  title: string;
  price: number;
  vendor: string;
  sku: string;
  rating: number;
  stock: number;
  thumbnail: string;
};

export type ProductDto = {
  id: number;
  title: string;
  price: number;
  brand?: string;
  sku?: string;
  rating: number;
  stock: number;
  thumbnail: string;
};

export type ProductsListResponseDto = {
  products: ProductDto[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductSortField = 'title' | 'price' | 'rating';
export type SortOrder = 'asc' | 'desc';

export type GetProductsParams = {
  q?: string;
  sortBy?: ProductSortField;
  order?: SortOrder;
};
