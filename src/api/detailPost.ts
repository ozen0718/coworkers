import axiosInstance from './axiosInstance';

/* 상세 카드 - 댓글 내용 */
export const fetchComment = (taskId: number) => {
  return axiosInstance.get(`/tasks/${taskId}/comments?limit=30`);
};

/* 상세 카드 - 댓글 작성 */
export const createComment = (taskId: number, payload: { content: string }) => {
  return axiosInstance.post(`/tasks/${taskId}/comments`, payload);
};

/* 상세 카드 - 댓글 삭제 */
export const deleteDetailComment = (taskId: number, commentId: number) => {
  return axiosInstance.delete(`/tasks/${taskId}/comments/${commentId}`);
};

/* 상세 카드 - 댓글 수정 */
export const editDetailComment = (
  taskId: number,
  commentId: number,
  payload: { content: string }
) => {
  return axiosInstance.patch(`/tasks/${taskId}/comments/${commentId}`, payload);
};
