import axiosInstance from './axiosInstance';

export interface Team {
  id: string;
  name: string;
  image?: string | null;
}

export interface ParsedUser {
  id?: number;
  nickname: string;
  profileImage: string | null;
  teams: Team[];
}

export const fetchUser = async () => {
  const { data } = await axiosInstance.get('/user');
  return data;
};

export const getUserInfo = async (): Promise<ParsedUser> => {
  const response = await axiosInstance.get('/user');
  const data = response.data;

  return {
    id: data.id,
    nickname: data.nickname,
    profileImage: data.profileImage ?? null,
    teams: (data.memberships ?? []).map((m: any) => ({
      id: String(m.group.id),
      name: m.group.name || '이름 없음',
      image: m.group.image || null,
    })),
  };
};
