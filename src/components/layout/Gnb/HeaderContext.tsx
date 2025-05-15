'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { getHeaderConfig } from './Headerconfig';
import { useAuthStore } from '@/stores/useAuthStore';

interface HeaderState {
  showTeamSelector: boolean;
  showFreeBoardLink: boolean;
  showProfile: boolean;
}

// 로그인하지 않은 상태일 때 기본값
const defaultState: HeaderState = {
  showTeamSelector: false,
  showFreeBoardLink: false,
  showProfile: false,
};

// Context 생성
const HeaderContext = createContext<HeaderState>(defaultState);

// 커스텀 훅
export const useHeader = () => useContext(HeaderContext);

// Provider 컴포넌트
export function HeaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStore(); //로그인 여부

  const visibility = getHeaderConfig(pathname, isLoggedIn);

  return <HeaderContext.Provider value={visibility}>{children}</HeaderContext.Provider>;
}
