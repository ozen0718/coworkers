import axiosInstance from './axiosInstance';

export interface CreateRecurringTaskBody {
  name: string;
  description: string;
  startDate?: string; // 할일 날짜
  frequencyType?: string;
  weekDays?: string[]; // weekly인 경우
  monthDay?: number; // monthly인 경우
  done?: boolean;
}

/* 할일 생성 */
export const createRecurringTask = (
  groupId: number,
  taskListId: number,
  body: CreateRecurringTaskBody
) => {
  console.log('API 요청 body:', JSON.stringify(body, null, 2));
  return axiosInstance.post(`/groups/${groupId}/task-lists/${taskListId}/recurring`, body);
};
