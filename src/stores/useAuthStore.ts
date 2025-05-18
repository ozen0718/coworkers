'use client';

import { create } from 'zustand';
import { useUserStore } from './useUserStore';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  isLoggedIn: false,

  setAccessToken: (token: string) => {
    localStorage.setItem('accessToken', token);
    set({ accessToken: token, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    set({ accessToken: null, isLoggedIn: false });
    useUserStore.getState().setUserInfo({ nickname: '', profileImage: null, teams: [] });
  },

  initializeAuth: () => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      set({ accessToken: storedToken, isLoggedIn: true });
    }
  },

  clearTokens: () => {
    get().logout();
  },
}));
