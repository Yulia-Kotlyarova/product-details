import { useEffect, useState } from 'react';

import { getProducts } from '@/shared/api/products';

import type { Product, GetProductsParams } from './types';
import { mapProductDtoToProduct } from '@/entities/product';

type UseProductsQueryResult ={
  products: Product[];
  isLoading: boolean;
  total: number
  errorMessage: string | null;
}


export const useProductsQuery = (
  params: GetProductsParams,
): UseProductsQueryResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getProducts(params);

        if (isCancelled) {
          return;
        }

        setProducts(response.products.map(mapProductDtoToProduct));
        setTotal(response.total);
      } catch {
        if (isCancelled) {
          return;
        }

        setProducts([]);
        setTotal(0);
        setErrorMessage('Не удалось загрузить список товаров');
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchProducts();

    return () => {
      isCancelled = true;
    };
  }, [params.q, params.sortBy, params.order]);

  return {
    products,
    total,
    isLoading,
    errorMessage,
  };
};
