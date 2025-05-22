import axiosInstance from './axiosInstance';

/* 반복 할일 생성 */
export const createRecurringTask = (groupId: number, taskListId: number) => {
  return axiosInstance.post(`/groups/${groupId}/task-lists/${taskListId}/recurring`);
};

/* 단일 할일 생성 */
