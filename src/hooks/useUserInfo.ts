import { fetchUser } from '@/api/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect } from 'react';
import type { Memberships } from '@/types/usertypes';

export const useUserInfo = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.user.me,
    queryFn: fetchUser,
    retry: false,
  });

  const setUserInfo = useUserStore((s) => s.setUserInfo);

  useEffect(() => {
    if (query.data) {
      setUserInfo({
        nickname: query.data.nickname ?? '',
        profileImage: query.data.image ?? null,
        teams: ((query.data.memberships as Memberships[]) ?? []).map((m) => ({
          id: String(m.group.id),
          name: m.group.name ?? '이름 없음',
          image: m.group.image ?? null,
        })),
      });
    }
  }, [query.data, setUserInfo]);

  return {
    ...query,
    isLoggedIn: !!query.data?.id,
    isAdmin: query.data?.role === 'ADMIN',
  };
};
