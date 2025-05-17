import axiosInstance from '@/api/axiosInstance';

export const createTaskList = async ({ groupId, name }: { groupId: number; name: string }) => {
  const response = await axiosInstance.post(`/groups/${groupId}/task-lists`, {
    name,
  });
  return response.data;
};
