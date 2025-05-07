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
