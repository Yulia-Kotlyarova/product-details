import { LoginForm } from '@/widgets/login-form';
import type { LoginFormValues } from '@/widgets/login-form';
import styles from './LoginPage.module.css';
import { RoutePath } from '@/app/router/routePaths.ts';
import { loginByCredentials } from '@/features/auth-by-credentials';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    await loginByCredentials(values);
    navigate(RoutePath.products, { replace: true });
  };

  return (
    <div className={styles.loginContainer}>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};
