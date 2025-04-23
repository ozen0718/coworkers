'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderState {
  showTeamSelector: boolean;
  showFreeBoardLink: boolean;
  showProfile: boolean;
  setHeaderState: (newState: Partial<HeaderState>) => void;
  resetHeaderState: () => void;
}

// ✅ 기본 상태
const defaultState: HeaderState = {
  showTeamSelector: false,
  showFreeBoardLink: false,
  showProfile: false,
  setHeaderState: () => {},
  resetHeaderState: () => {},
};

// ✅ Context 생성
const HeaderContext = createContext<HeaderState>(defaultState);

// ✅ Context 접근 Hook
export const useHeader = () => useContext(HeaderContext);

// ✅ Provider 구현
export function HeaderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Omit<HeaderState, 'setHeaderState' | 'resetHeaderState'>>({
    showTeamSelector: false,
    showFreeBoardLink: false,
    showProfile: false,
  });

  const setHeaderState = (newState: Partial<HeaderState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const resetHeaderState = () => {
    setState({
      showTeamSelector: false,
      showFreeBoardLink: false,
      showProfile: false,
    });
  };

  return (
    <HeaderContext.Provider value={{ ...state, setHeaderState, resetHeaderState }}>
      {children}
    </HeaderContext.Provider>
  );
}
