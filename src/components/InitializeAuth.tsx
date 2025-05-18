'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { getUserInfo } from '@/api/user';

export default function InitializeAuth() {
  const initializeAuth = useAuthStore((s) => s.initializeAuth);
  const accessToken = useAuthStore((s) => s.accessToken);
  const logout = useAuthStore((s) => s.logout);
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const pathname = usePathname();

  // 1) 최초 한 번만 localStorage → Zustand
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // 2) accessToken 이 설정되거나, 페이지가 변경될 때마다 사용자 정보 재조회
  useEffect(() => {
    if (!accessToken) return;

    (async () => {
      try {
        const user = await getUserInfo();
        setUserInfo({
          nickname: user.nickname,
          profileImage: user.profileImage,
          teams: user.teams,
        });
      } catch {
        logout(); // 토큰 만료 시 토큰·유저정보 모두 초기화
      }
    })();
  }, [accessToken, pathname, setUserInfo, logout]);

  return null;
}
