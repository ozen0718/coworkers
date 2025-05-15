import axiosInstance from '@/api/axiosInstance';

export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/user');
  return response.data;
};
