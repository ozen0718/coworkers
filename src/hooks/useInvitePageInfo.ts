import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/api/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useUserStore } from '@/stores/useUserStore';
import { User } from '@/types/usertypes';

export const useInvitedUserInfo = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const query = useQuery<User>({
    queryKey: QUERY_KEYS.user.me,
    queryFn: fetchUser,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      const { nickname, image, memberships } = query.data;
      const teams = memberships.map((membership) => ({
        id: String(membership.group.id),
        name: membership.group.name,
        image: membership.group.image,
      }));

      setUserInfo({
        nickname,
        profileImage: image,
        teams,
      });
    }
  }, [query.data, setUserInfo]);

  return {
    ...query,
    email: query.data?.email ?? null,
    isLoggedIn: !!query.data?.id,
  };
};
