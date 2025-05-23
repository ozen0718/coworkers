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

/* 할일 수정 */
export interface EditTaskBody {
  name: string;
  description: string;
  done: boolean;
}

/* 할일 생성 */
export const createRecurringTask = (
  groupId: number,
  taskListId: number,
  body: CreateRecurringTaskBody
) => {
  return axiosInstance.post(`/groups/${groupId}/task-lists/${taskListId}/recurring`, body);
};
