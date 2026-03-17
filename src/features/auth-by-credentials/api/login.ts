import { AxiosError } from 'axios';
import { api } from '@/shared/api/base';
import type { LoginRequestDto, LoginResponseDto } from '../model/types';

export const login = async (
  payload: LoginRequestDto,
): Promise<LoginResponseDto> => {
  try {
    const { data } = await api.post<LoginResponseDto>('/auth/login', payload);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Не удалось выполнить вход',
      );
    }

    throw new Error('Не удалось выполнить вход');
  }
};
