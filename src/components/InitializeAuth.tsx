'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { getUserInfo } from '@/app/api/user';

export default function InitializeAuth() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  // 초기 mount 시
  useEffect(() => {
    const init = async () => {
      initializeAuth();

      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const user = await getUserInfo();
          setUserInfo({
            nickname: user.nickname,
            profileImage: user.profileImage,
            teams: user.teams,
          });
        } catch (_) {
          // 유저 정보 요청 실패 무시
        }
      }
    };

    init();
  }, [initializeAuth, setUserInfo]);

  // 로그인 상태가 변경되었을 때도 유저 정보 fetch
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchUser = async () => {
      try {
        const user = await getUserInfo();
        setUserInfo({
          nickname: user.nickname,
          profileImage: user.profileImage,
          teams: user.teams,
        });
      } catch (_) {
        // 유저 정보 요청 실패 무시
      }
    };

    fetchUser();
  }, [isLoggedIn, setUserInfo]);

  return null;
}
