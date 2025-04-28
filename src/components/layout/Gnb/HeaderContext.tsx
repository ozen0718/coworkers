'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { HEADER_VISIBILITY_CONFIG } from '../../../hooks/Headerconfig';

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

  const visibility: HeaderState = {
    ...defaultState,
    ...HEADER_VISIBILITY_CONFIG[pathname],
  };

  return <HeaderContext.Provider value={visibility}>{children}</HeaderContext.Provider>;
}
