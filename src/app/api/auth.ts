import axiosInstance from '@/app/api/axiosInstance';

export interface SignupRequest {
  teamId: string;
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export const signup = async ({ teamId, ...body }: SignupRequest): Promise<void> => {
  await axiosInstance.post(`/team/${teamId}/auth/signUp`, body);
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

export const login = async ({ teamId, ...body }: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`/team/${teamId}/auth/signIn`, body);
  return response.data;
};
