import { useEffect, useState } from 'react';

import { mapProductDtoToProduct } from '@/entities/product/model/mappers';
import type { Product } from '@/entities/product/model/types';
import { getProducts } from '@/shared/api/products';
import { usePersistentSorting } from '@/shared/lib/table/usePersistentSorting';
import { ProductsTable } from '@/widgets/products-table';
import { AddProductModal } from '@/features/add-product';
import { toast } from 'react-toastify';
import { Button } from '../../../shared/ui/button';
import styles from './ProductsPage.module.css';
import { Input } from '../../../shared/ui/input';

const PRODUCTS_LIMIT = 20;
const PRODUCTS_SORTING_STORAGE_KEY = 'products-sorting';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    toast.success('Товар успешно добавлен');
  };

  const { sorting, setSorting } = usePersistentSorting(
    PRODUCTS_SORTING_STORAGE_KEY
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getProducts({
          q: searchQuery,
          limit: PRODUCTS_LIMIT,
          skip: 0,
          signal: controller.signal,
        });

        const mappedProducts = response.products.map(mapProductDtoToProduct);
        setProducts(mappedProducts);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setProducts([]);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Произошла ошибка при загрузке товаров'
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <section className={styles.section}>

      <form className={styles.form} onSubmit={handleSubmitSearch}>
        <h1>Товары</h1>

        <div className={styles.findBox}>
          <Input
            type="text"
            className={styles.input}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Поиск товаров"
          />
          <Button type="submit">Найти</Button>
        </div>
      </form>

      <div className={styles.tableHeaderBox}>
        <h2>Все позиции</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>
        Добавить
      </Button>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {isLoading && <p>Загрузка...</p>}

      {!isLoading && errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}

      {!isLoading && !errorMessage && products.length === 0 && (
        <p>Товары не найдены</p>
      )}

      {!isLoading && !errorMessage && products.length > 0 && (
        <ProductsTable
          products={products}
          sorting={sorting}
          onSortingChange={setSorting}
        />
      )}
    </section>
  );
};
