import axiosInstance from '@/app/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/user');
      return data;
    },
    retry: false, // 로그인 안 된 상태에서 401 응답 받았을 때 무한 재시도 방지
  });
};