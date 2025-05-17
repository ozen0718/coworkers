'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { getUserInfo } from '@/api/user';

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
          console.log('초기 로그인 시 getUserInfo 결과:', user);
          console.log('초기 로그인 시 user.teams:', user.teams);

          setUserInfo({
            nickname: user.nickname,
            profileImage: user.profileImage,
            teams: user.teams,
          });
        } catch (err) {
          console.error('❌ 초기 로그인 시 getUserInfo 실패:', err);
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
        console.log('상태 변경 후 getUserInfo 결과:', user);
        console.log('상태 변경 후 user.teams:', user.teams);

        setUserInfo({
          nickname: user.nickname,
          profileImage: user.profileImage,
          teams: user.teams,
        });
      } catch (err) {
        console.error('상태 변경 후 getUserInfo 실패:', err);
      }
    };

    fetchUser();
  }, [isLoggedIn, setUserInfo]);

  return null;
}
