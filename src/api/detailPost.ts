import axiosInstance from './axiosInstance';

/* 상세 카드 - 댓글 내용 */
export const fetchComment = (taskId: number) => {
  return axiosInstance.get(`/tasks/${taskId}/comments?limit=30`);
};

/* 상세 카드 - 댓글 작성 */
export const createComment = (taskId: number, payload: { content: string }) => {
  return axiosInstance.post(`/tasks/${taskId}/comments`, payload);
};
