import axiosInstance from '@/api/axiosInstance';
import { Task } from '@/types/tasktypes';
import { TaskList } from '@/types/tasklisttypes';

export const getTaskLists = async (groupId: string | number): Promise<TaskList[]> => {
  const response = await axiosInstance.get(`/groups/${groupId}/task-lists`);
  return response.data;
};

export const createTaskList = async ({
  groupId,
  name,
}: {
  groupId: string | number;
  name: string;
}): Promise<TaskList> => {
  const response = await axiosInstance.post(`/groups/${groupId}/task-lists`, {
    name,
  });
  return response.data;
};

export const getTasksByTaskList = async (
  groupId: string | number,
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

export const createTask = async ({
  groupId,
  taskListId,
  name,
  description,
  date,
  frequency = 'ONCE',
}: {
  groupId: string | number;
  taskListId: number;
  name: string;
  description?: string;
  date: string;
  frequency?: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
}): Promise<Task> => {
  const response = await axiosInstance.post(`/groups/${groupId}/task-lists/${taskListId}/tasks`, {
    name,
    description,
    date,
    frequency,
  });
  return response.data;
};
