import * as yup from 'yup';
import type { LoginFormValues } from './types';

export const loginSchema: yup.ObjectSchema<LoginFormValues> = yup
  .object({
    username: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль'),
    remember: yup.boolean().required(),
  })
  .required();
