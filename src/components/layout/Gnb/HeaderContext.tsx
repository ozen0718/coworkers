'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { getHeaderConfig } from './Headerconfig';

interface HeaderState {
  showTeamSelector: boolean;
  showFreeBoardLink: boolean;
  showProfile: boolean;
}

const defaultState: HeaderState = {
  showTeamSelector: false,
  showFreeBoardLink: false,
  showProfile: false,
};

const HeaderContext = createContext<HeaderState>(defaultState);

export const useHeader = () => useContext(HeaderContext);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const visibility: HeaderState = getHeaderConfig(pathname);

  return <HeaderContext.Provider value={visibility}>{children}</HeaderContext.Provider>;
}
