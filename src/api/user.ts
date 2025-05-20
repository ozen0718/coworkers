import axiosInstance from '@/api/axiosInstance';
import { Membership, Team } from '@/types/usertypes';

export interface ParsedUser {
  id?: number;
  nickname: string;
  profileImage: string | null;
  email: string;
  memberships: Membership[];
}

export interface RawUserResponse {
  id?: number;
  nickname: string;
  image: string | null;
  email: string;
  memberships: Membership[];
}

// 기본 fetch 함수
export const fetchUser = async () => {
  const { data } = await axiosInstance.get('/user');
  return data;
};

// teams를 포함해서 반환하는 함수
export const getUserInfo = async (): Promise<ParsedUser & { teams: Team[] }> => {
  const { data } = await axiosInstance.get<RawUserResponse>('/user');

  const teams: Team[] = (data.memberships ?? []).map((m) => ({
    id: String(m.group.id),
    name: m.group.name ?? '이름 없음',
    image: m.group.image ?? null,
  }));

  return {
    id: data.id,
    nickname: data.nickname,
    profileImage: data.image,
    email: data.email,
    memberships: data.memberships ?? [],
    teams,
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
  await axiosInstance.delete(`/user`);
};
