import { saveSessionTokens } from '@/entities/session/model/storage';
import { login } from '../api/login';

type LoginByCredentialsParams = {
  username: string;
  password: string;
  remember: boolean;
};

export const loginByCredentials = async ({
                                           username,
                                           password,
                                           remember,
                                         }: LoginByCredentialsParams): Promise<void> => {
  const response = await login({
    username,
    password,
    expiresInMins: 60,
  });

  saveSessionTokens(response.accessToken, response.refreshToken, remember);
};
