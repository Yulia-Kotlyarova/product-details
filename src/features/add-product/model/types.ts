export type AddProductFormValues = {
  title: string;
  price: string;
  vendor: string;
  sku: string;
};

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

export type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
};
