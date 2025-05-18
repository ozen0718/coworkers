import axiosInstance from '@/api/axiosInstance';
import { Group } from '@/types/grouptypes';

export const getGroupDetail = async (groupId: number): Promise<Group> => {
  const response = await axiosInstance.get(`/groups/${groupId}`);
  return response.data;
};
