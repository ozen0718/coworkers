import axiosInstance from '@/app/api/axiosInstance';

// 회원가입
export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export const signup = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignupRequest): Promise<void> => {
  await axiosInstance.post(`/auth/signUp`, {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
};

// 로그인
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  nickname?: string;
  userId?: number;
}

export const login = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`/auth/signIn`, {
    email,
    password,
  });
  return response.data;
};

// 비밀번호 재설정
export const resetPassword = async ({
  password,
  passwordConfirmation,
  token,
}: {
  password: string;
  passwordConfirmation: string;
  token: string;
}) => {
  return await axiosInstance.patch(`/user/reset-password`, {
    password,
    passwordConfirmation,
    token,
  });
};

// 비밀번호 재설정 이메일 요청
export const resetPasswordEmail = async ({
  email,
  redirectUrl,
}: {
  email: string;
  redirectUrl: string;
}): Promise<void> => {
  await axiosInstance.post(`/user/send-reset-password-email`, {
    email,
    redirectUrl,
  });
};
