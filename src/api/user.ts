import axiosInstance from '@/app/api/axiosInstance';

export const fetchUser = async () => {
  const { data } = await axiosInstance.get('/user');
  return data;
};
