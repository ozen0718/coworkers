import axiosInstance from '@/api/axiosInstance';
import { Task } from '@/types/tasktypes';

export const createTaskList = async ({ groupId, name }: { groupId: number; name: string }) => {
  const response = await axiosInstance.post(`/groups/${groupId}/task-lists`, {
    name,
  });
  return response.data;
};

export const getTasksByTaskList = async (
  groupId: number,
  taskListId: number,
  date?: string
): Promise<Task[]> => {
  const response = await axiosInstance.get(`/groups/${groupId}/task-lists/${taskListId}/tasks`, {
    params: date ? { date } : {},
  });
  return response.data;
};

export const getTaskDetail = async (
  groupId: number,
  taskListId: number,
  taskId: number
): Promise<Task> => {
  const response = await axiosInstance.get(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};
