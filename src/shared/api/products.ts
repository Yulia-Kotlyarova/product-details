import type { ProductsListResponseDto } from '@/entities/product/model/types';

const BASE_URL = 'https://dummyjson.com';

type GetProductsParams = {
  q?: string;
  limit?: number;
  skip?: number;
  signal?: AbortSignal;
};

export const getProducts = async (
  params: GetProductsParams = {}
): Promise<ProductsListResponseDto> => {
  const { q, limit = 20, skip = 0, signal } = params;

  const url = q?.trim()
    ? new URL(`${BASE_URL}/products/search`)
    : new URL(`${BASE_URL}/products`);

  url.searchParams.set('limit', String(limit));
  url.searchParams.set('skip', String(skip));

  if (q?.trim()) {
    url.searchParams.set('q', q.trim());
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    signal,
  });

  if (!response.ok) {
    throw new Error(`Не удалось загрузить товары. Код: ${response.status}`);
  }

  return response.json() as Promise<ProductsListResponseDto>;
};
