import axiosInstance from './axiosInstance';

/* 자유게시판 - 일반 글 */
export const fetchGeneral = (token: string) => {
  return axiosInstance.get('articles', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/* 상세 글 - 게시글 내용 */
export const fetchArticle = (id: number, token: string) => {
  return axiosInstance.get(`/articles/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/* 상세 글 - 게시글 삭제 */
export const deleteArticle = (articleid: number, token: string) => {
  return axiosInstance.delete(`/articles/${articleid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/* 상세 글 - 댓글 내용 */
export const fetchComment = (id: number, token: string) => {
  return axiosInstance.get(`/articles/${id}/comments?limit=30`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/* 상세 글 - 좋아요 */
export const addLike = (articleId: number, token: string) => {
  return axiosInstance.post(
    `/articles/${articleId}/like`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/* 상세글 - 좋아요 취소 */
export const deleteLike = (articleId: number, token: string) => {
  return axiosInstance.delete(`/articles/${articleId}/like`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/* 댓글 - 댓글 작성 */
export const createComment = (articleid: number, token: string, payload: { content: string }) => {
  return axiosInstance.post(`/articles/${articleid}/comments`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/* 댓글 - 댓글 삭제 */
export const deleteComment = (commentid: number, token: string) => {
  return axiosInstance.delete(`/comments/${commentid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/* 댓글 - 댓글 수정 */
export const editComment = (commentid: number, token: string, payload: { content: string }) => {
  return axiosInstance.patch(`/comments/${commentid}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
