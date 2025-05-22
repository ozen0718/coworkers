import axiosInstance from './axiosInstance';

interface CreateRecurringTaskBody {
  name: string;
  description: string;
  startDate: string;
  frequencyType: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  weekDays?: string[]; // weekly인 경우
  monthDay?: number; // monthly인 경우
}

export const createRecurringTask = (
  groupId: number,
  taskListId: number,
  body: CreateRecurringTaskBody
) => {
  return axiosInstance.post(`/groups/${groupId}/task-lists/${taskListId}/recurring`, body);
};

/* 단일 할일 생성 */
