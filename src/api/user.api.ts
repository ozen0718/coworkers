import axiosInstance from '@/api/axiosInstance';
import { GroupPageInfo } from '@/types/teampagetypes';
import { Memberships } from '@/types/usertypes';
/*
export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/user');
  return response.data;
};*/

export const getGroupPageInfo = async (groupId: string): Promise<GroupPageInfo> => {
  const res = await axiosInstance.get(`/user/memberships`);
  const memberships: Memberships[] = res.data;

  console.log('🔍 현재 URL groupId:', groupId);
  console.log(
    '📦 서버에서 받은 그룹들:',
    memberships.map((m) => m.group.id)
  );

  const matched = memberships.find((m) => String(m.group.id) === groupId);
  if (!matched) throw new Error('No matching group found');

  return {
    role: matched.role,
    group: {
      name: matched.group.name,
    },
  };
};
