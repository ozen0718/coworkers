import axiosInstance from '@/app/api/axiosInstance';

export interface SignupRequest {
  teamId: string;
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export const signup = async ({
  teamId,
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignupRequest): Promise<void> => {
  await axiosInstance.post(`/${teamId}/auth/signUp`, {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
};

export interface LoginRequest {
  teamId: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  nickname?: string;
  userId?: number;
}

export const login = async ({ teamId, email, password }: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`/${teamId}/auth/signIn`, {
    email,
    password,
  });
  return response.data;
};
