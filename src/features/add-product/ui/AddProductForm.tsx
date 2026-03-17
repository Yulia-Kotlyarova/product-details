import { useState } from 'react';
import * as yup from 'yup';
import type { AddProductFormValues, AddProductModalProps, Product } from '../model/types';
import { addProductSchema } from '../model/schema';
import styles from './AddProductForm.module.css';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';

export const AddProductModal = ({
                                  isOpen,
                                  onClose,
                                  onAddProduct,
                                }: AddProductModalProps) => {
  const [values, setValues] = useState<AddProductFormValues>({
    title: '',
    price: '',
    vendor: '',
    sku: '',
  });

  const [errors, setErrors] = useState<Partial<AddProductFormValues>>({});

  if (!isOpen) {
    return null;
  }

  const handleChange =
    (field: keyof AddProductFormValues) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));

        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addProductSchema.validate(values, { abortEarly: false });

      const newProduct: Product = {
        id: Date.now(),
        title: values.title.trim(),
        price: Number(values.price),
        vendor: values.vendor.trim(),
        sku: values.sku.trim(),
        rating: 0,
        stock: 0,
        thumbnail: '',
      };

      onAddProduct(newProduct);

      setValues({
        title: '',
        price: '',
        vendor: '',
        sku: '',
      });
      setErrors({});
      onClose();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: Partial<AddProductFormValues> = {};

        error.inner.forEach((item) => {
          if (item.path) {
            nextErrors[item.path as keyof AddProductFormValues] = item.message;
          }
        });

        setErrors(nextErrors);
      }
    }
  };

  return (
      <div>
        <h2>Добавить товар</h2>

        <form  className={styles.form} onSubmit={handleSubmit}>
          <div>
            <Input
              value={values.title}
              onChange={handleChange('title')}
              placeholder="Наименование"
            />
          </div>

          <div>
            <Input
              value={values.price}
              onChange={handleChange('price')}
              placeholder="Цена"
              error={errors.price}
            />
          </div>

          <div>
            <Input
              value={values.vendor}
              onChange={handleChange('vendor')}
              placeholder="Вендор"
              error={errors.vendor}
            />
          </div>

          <div>
            <Input
              value={values.sku}
              onChange={handleChange('sku')}
              placeholder="Артикул"
              error={errors.sku}
            />
          </div>

          <Button type="button" onClick={onClose}>
            Отмена
          </Button>
          <Button  variant={'secondary'} type="submit">Сохранить</Button>
        </form>
      </div>
  );
};
