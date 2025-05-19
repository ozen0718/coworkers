// src/components/auth/InitializeAuth.tsx
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
    console.log('[InitAuth] 🔄 마운트: localStorage에서 토큰 복구');
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log('[InitAuth] 🔑 토큰 발견, setAccessToken 호출', token);
      setAccessToken(token);
    } else {
      console.log('[InitAuth] 🔒 토큰 없음, 로그인 필요');
    }
  }, [setAccessToken]);

  // 2) accessToken이 바뀔 때마다: getUserInfo → setUserInfo
  useEffect(() => {
    console.log('[InitAuth] 🔄 accessToken 변경 감지:', accessToken);
    if (!accessToken) return;

    (async () => {
      try {
        console.log('[InitAuth] 🌐 getUserInfo 호출');
        const user = await getUserInfo();
        console.log('[InitAuth] 🌐 getUserInfo 응답:', user);

        setUserInfo({
          nickname: user.nickname,
          profileImage: user.profileImage,
          teams: user.teams,
        });
        console.log('[InitAuth] ✅ userStore에 setUserInfo 완료');
      } catch (err) {
        console.error('[InitAuth] ⚠️ getUserInfo 실패, logout 호출', err);
        logout();
      }
    })();
  }, [accessToken, setUserInfo, logout]);

  return null;
}
