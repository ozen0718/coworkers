import axiosInstance from './axiosInstance';

interface CreateArticleParms {
  title: string;
  content: string;
  image?: string;
  token: string;
}

export const createArticle = async ({ title, content, image, token }: CreateArticleParms) => {
  const payload: Record<string, string> = { title, content };
  if (image) payload.image = image;

  const response = await axiosInstance.post('/articles', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
