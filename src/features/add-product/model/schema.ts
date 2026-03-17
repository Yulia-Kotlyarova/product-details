import * as yup from 'yup';

export const addProductSchema = yup.object({
  title: yup.string().required('Введите наименование'),
  price: yup
    .number()
    .typeError('Введите цену')
    .positive('Цена должна быть больше 0')
    .required('Введите цену'),
  vendor: yup.string().required('Введите вендора'),
  sku: yup.string().required('Введите артикул'),
});
