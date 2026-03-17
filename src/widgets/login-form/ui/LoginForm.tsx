import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { loginSchema } from '../model/schema';
import type { LoginFormValues } from '../model/types';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
    mode: 'onBlur',
  });

  const handleFormSubmit = async (values: LoginFormValues) => {
    try {
      setServerError('');
      await onSubmit(values);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
        return;
      }

      setServerError('Не удалось выполнить вход');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <h2 className={styles.title}> Добро пожаловать!</h2>
      <p className={styles.subtitle}> Пожалуйста, авторизируйтесь</p>
      <Input
        label="Логин"
        placeholder="Введите логин"
        autoComplete="username"
        error={errors.username?.message}
        {...register('username')}
      />

      <Input
        label="Пароль"
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder="Введите пароль"
        autoComplete="current-password"
        error={errors.password?.message}
        endAdornment={
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label={
              isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'
            }
          >
            {isPasswordVisible ? '🙈' : '👁'}
          </button>
        }
        {...register('password')}
      />

      <Checkbox className={styles.checkbox} label="Запомнить данные" {...register('remember')} />

      {serverError ? (
        <div className={styles.serverError} role="alert">
          {serverError}
        </div>
      ) : null}

      <Button type="submit" fullWidth loading={isSubmitting}>
        Войти
      </Button>
      <span>или</span>
      <span className={styles.createAcc}> Нет аккаунта? {" "}
        <Link className={styles.link} to={"/"}>Создать</Link>
      </span>
    </form>
  );
};
