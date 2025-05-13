import axiosInstance from './axiosInstance';

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
