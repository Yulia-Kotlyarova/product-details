import { isAccessToken } from './isAccessToken.ts';

export const getIsAuthenticated = (): boolean => {
  return isAccessToken();
};
