'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { getUserInfo } from '@/api/user';

export default function InitializeAuth() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const accessToken = useAuthStore((s) => s.accessToken);
  const logout = useAuthStore((s) => s.logout);
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  // 1) 마운트 시: localStorage → Zustand
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    }
  }, [setAccessToken]);

  // 2) accessToken이 바뀔 때마다: getUserInfo → setUserInfo
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
        logout();
      }
    })();
  }, [accessToken, setUserInfo, logout]);

  return null;
}
