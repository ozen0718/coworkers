import axiosInstance from '@/api/axiosInstance';
import { Memberships } from '@/types/usertypes';

export interface ParsedUser {
  nickname: string;
  profileImage: string | null;
  email: string;
  id: number;
  memberships: Memberships[];
}

export interface RawUserResponse {
  nickname: string;
  image: string | null;
  email: string;
  id: number;
  memberships: Memberships[];
}

export const fetchUser = async () => {
  const { data } = await axiosInstance.get('/user');
  return data;
};

export const getUserInfo = async (): Promise<ParsedUser> => {
  const { data } = await axiosInstance.get<RawUserResponse>('/user');

  return {
    nickname: data.nickname,
    profileImage: data.image,
    email: data.email,
    id: data.id,
    memberships: data.memberships ?? [],
  };
};
