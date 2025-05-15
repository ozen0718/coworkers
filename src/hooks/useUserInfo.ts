import { fetchUser } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

export const useUserInfo = () => {
  const query = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUser,
    retry: false, // 로그인 안 된 상태에서 401 응답 받았을 때 무한 재시도 방지
  });

  return {
    ...query,
    isLoggedIn: !!query.data?.id,
    isAdmin: query.data?.role === 'ADMIN',
  };
};
