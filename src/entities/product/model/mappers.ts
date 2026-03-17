import type { Product, ProductDto } from './types';

export const mapProductDtoToProduct = (dto: ProductDto): Product => {
  return {
    id: dto.id,
    title: dto.title,
    price: dto.price,
    vendor: dto.brand ?? '—',
    sku: dto.sku ?? '—',
    rating: dto.rating,
    stock: dto.stock,
    thumbnail: dto.thumbnail,
  };
};
