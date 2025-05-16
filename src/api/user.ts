import axiosInstance from '@/api/axiosInstance';
import { Memberships, Team } from '@/types/usertypes';

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
    nickname: data.nickname,
    profileImage: data.image,
    email: data.email,
    id: data.id,
    memberships: data.memberships ?? [],
    teams, // ✅ 새로 추가된 필드
  };
};
