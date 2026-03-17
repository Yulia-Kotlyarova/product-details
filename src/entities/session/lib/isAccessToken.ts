const ACCESS_TOKEN_KEY = 'access_token';

export const isAccessToken = (): boolean => {
  return !!(
    localStorage.getItem(ACCESS_TOKEN_KEY) ??
    sessionStorage.getItem(ACCESS_TOKEN_KEY)
  );
};
