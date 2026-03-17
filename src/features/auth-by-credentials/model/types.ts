export type LoginRequestDto = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type LoginResponseDto = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};
