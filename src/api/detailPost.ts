import axiosInstance from './axiosInstance';

/* 상세 카드 - 할 일 내용 */
export const fetchTask = (groupId: number, tasklistid: number, taskid: number) => {
  return axiosInstance.get(`/groups/${groupId}/task-lists/${tasklistid}/tasks/${taskid}`);
};

/* 상세 카드 - 댓글 내용 */
export const fetchComment = (taskid: number) => {
  return axiosInstance.get(`/tasks/${taskid}/comments?limit=30`);
};

/* 상세 카드 - 댓글 작성 */
export const createComment = (taskid: number, payload: { content: string }) => {
  return axiosInstance.post(`/tasks/${taskid}/comments`, payload);
};

/* 상세 카드 - 댓글 삭제 */
export const deleteDetailComment = (taskid: number, commentId: number) => {
  return axiosInstance.delete(`/tasks/${taskid}/comments/${commentId}`);
};

/* 상세 카드 - 댓글 수정 */
export const editDetailComment = (
  taskid: number,
  commentId: number,
  payload: { content: string }
) => {
  return axiosInstance.patch(`/tasks/${taskid}/comments/${commentId}`, payload);
};

/* 상세 카드 - 할일 삭제 */
