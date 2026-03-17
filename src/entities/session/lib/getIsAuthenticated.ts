import { isAccessToken } from './isAccessToken';

export const getIsAuthenticated = (): boolean => {
  return isAccessToken();
};
