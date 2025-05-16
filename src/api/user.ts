import axiosInstance from '@/api/axiosInstance';
import { Memberships } from '@/types/usertypes';

export interface Team {
  id: string;
  name: string;
  image?: string | null;
}

export interface ParsedUser {
  nickname: string;
  profileImage: string | null;
  teams: Team[];
}

export interface RawUserResponse {
  nickname: string;
  image: string | null;
  memberships: Memberships[];
}

export const fetchUser = async () => {
  const { data } = await axiosInstance.get('/user');
  return data;
};

export const getUserInfo = async (): Promise<ParsedUser> => {
  const response = await axiosInstance.get<RawUserResponse>('/user');
  const data = response.data;

  return {
    nickname: data.nickname,
    profileImage: data.image ?? null,
    teams: (data.memberships ?? []).map((m) => ({
      id: String(m.group.id),
      name: m.group.name ?? '이름 없음',
      image: m.group.image ?? null,
    })),
  };
};

export const updateUserName = async (name: string) => {
  await axiosInstance.patch('/user', { nickname: name });
};

export const updateUserPassword = async ({
  password,
  passwordConfirmation,
}: {
  password: string;
  passwordConfirmation: string;
}) => {
  await axiosInstance.patch('/user/password', { passwordConfirmation, password });
};

export const deleteUser = async () => {
  await axiosInstance.delete(`/user`)
}