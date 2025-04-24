'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
interface HeaderState {
  showTeamSelector: boolean;
  showFreeBoardLink: boolean;
  showProfile: boolean;
}

interface HeaderContextType extends HeaderState {
  setHeaderState: (newState: Partial<HeaderState>) => void;
  resetHeaderState: () => void;
}

const defaultState: HeaderContextType = {
  showTeamSelector: false,
  showFreeBoardLink: false,
  showProfile: false,
  setHeaderState: () => {},
  resetHeaderState: () => {},
};

const HeaderContext = createContext<HeaderContextType>(defaultState);
export const useHeader = () => useContext(HeaderContext);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HeaderState>({
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
