import axiosInstance from '@/api/axiosInstance';
import { GroupPageInfo } from '@/types/teampagetypes';
/*
export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/user');
  return response.data;
};*/

export const getGroupPageInfo = async (): Promise<GroupPageInfo> => {
  const res = await axiosInstance.get(`/user/memberships`);
  const membership = res.data?.[0];

  if (!membership) throw new Error('No group membership found');

  return {
    role: membership.role,
    group: {
      name: membership.group.name,
    },
  };
};
