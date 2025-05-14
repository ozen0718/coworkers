'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { getUserInfo } from '@/app/api/user';
import { HeaderProvider } from '@/components/layout/Gnb/HeaderContext';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { initializeAuth, isLoggedIn } = useAuthStore();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [isInitialized, setIsInitialized] = useState(false);

  // 1. accessToken 기반 로그인 상태 복원 + 유저 정보 요청
  useEffect(() => {
    const initialize = async () => {
      initializeAuth();
      setIsInitialized(true);

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

    initialize();
  }, []);

  // 2. 로그인 상태일 경우 보조로 유저 정보 요청
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

  if (!isInitialized) return null;

  return (
    <HeaderProvider>
      <main className="px-4 md:px-6">
        <div className="mx-auto max-w-[1200px]">{children}</div>
      </main>
    </HeaderProvider>
  );
}
