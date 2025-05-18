import axiosInstance from '@/api/axiosInstance';
import { GroupPageInfo } from '@/types/teampagetypes';
import { Memberships } from '@/types/usertypes';

export const getGroupPageInfo = async (groupId: string): Promise<GroupPageInfo> => {
  const res = await axiosInstance.get(`/user/memberships`);
  const memberships: Memberships[] = res.data;

  const matched = memberships.find((m) => String(m.group.id) === groupId);
  if (!matched) throw new Error('No matching group found');

  return {
    role: matched.role,
    group: {
      id: matched.group.id,
      name: matched.group.name,
    },
  };
};
