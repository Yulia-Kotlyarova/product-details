import { Navigate } from 'react-router-dom';
import { RoutePath } from './routePaths';
import { getIsAuthenticated } from '@/entities/session/lib/getIsAuthenticated';
import type { ReactElement } from 'react';

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = getIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={RoutePath.login} replace />;
  }

  return children;
};
