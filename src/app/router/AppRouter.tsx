import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages/login-page';
import { ProductsPage } from '@/pages/products-page';
import { RoutePath } from './routePaths';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePath.login} element={<LoginPage />} />
      <Route
        path={RoutePath.products}
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={RoutePath.login} replace />} />
    </Routes>
  );
};
