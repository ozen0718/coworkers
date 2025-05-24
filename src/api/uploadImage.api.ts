import axiosInstance from './axiosInstance';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data.url;
};
