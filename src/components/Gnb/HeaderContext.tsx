'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderState {
  showTeamSelector: boolean;
  showFreeBoardLink: boolean;
  showProfile: boolean;
  setHeaderState: (newState: Partial<HeaderState>) => void;
  resetHeaderState: () => void;
}

const defaultState: HeaderState = {
  showTeamSelector: false,
  showFreeBoardLink: false,
  showProfile: false,
  setHeaderState: () => {},
  resetHeaderState: () => {},
};

const HeaderContext = createContext<HeaderState>(defaultState);

export const useHeader = () => useContext(HeaderContext);

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
