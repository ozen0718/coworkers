'use client';

import { create } from 'zustand';
import { useEffect } from 'react';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isLoggedIn: false,
  setAccessToken: (token: string) => {
    localStorage.setItem('accessToken', token);
    set({ accessToken: token, isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ accessToken: null, isLoggedIn: false });
  },
  initializeAuth: () => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      set({ accessToken: storedToken, isLoggedIn: true });
    }
  },
}));
