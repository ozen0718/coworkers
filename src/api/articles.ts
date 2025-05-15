import axiosInstance from '../app/api/axiosInstance';

/* 자유게시판 - 일반 글 */
export const fetchGeneral = (keyword?: string) => {
  if (!keyword) {
    return axiosInstance.get('/articles');
  }

  const params: Record<string, string> = {
    keyword,
  };

  return axiosInstance.get('/articles', { params });
};

/* 자유게시판 - 베스트 글 */
export const fetchBest = (keyword?: string) => {
  const params: Record<string, string> = {
    orderBy: 'like',
  };

  if (keyword) {
    params.keyword = keyword;
  }

  return axiosInstance.get('/articles', {
    params,
  });
};

/* 자유게시판 - 게시글 작성 */
export const createArticle = (payload: { title: string; content: string; image?: string }) => {
  return axiosInstance.post('/articles', payload);
};

/* 상세 글 - 게시글 내용 */
export const fetchArticle = (id: number) => {
  return axiosInstance.get(`/articles/${id}`);
};

/* 상세 글 - 게시글 삭제 */
export const deleteArticle = (articleid: number) => {
  return axiosInstance.delete(`/articles/${articleid}`);
};

/* 상세 글 - 댓글 내용 */
export const fetchComment = (id: number) => {
  return axiosInstance.get(`/articles/${id}/comments?limit=30`);
};

/* 상세 글 - 좋아요 */
export const addLike = (articleId: number) => {
  return axiosInstance.post(`/articles/${articleId}/like`, {});
};

/* 상세글 - 좋아요 취소 */
export const deleteLike = (articleId: number) => {
  return axiosInstance.delete(`/articles/${articleId}/like`);
};

/* 댓글 - 댓글 작성 */
export const createComment = (articleid: number, payload: { content: string }) => {
  return axiosInstance.post(`/articles/${articleid}/comments`, payload);
};

/* 댓글 - 댓글 삭제 */
export const deleteComment = (commentid: number) => {
  return axiosInstance.delete(`/comments/${commentid}`);
};

/* 댓글 - 댓글 수정 */
export const editComment = (commentid: number, payload: { content: string }) => {
  return axiosInstance.patch(`/comments/${commentid}`, payload);
};
