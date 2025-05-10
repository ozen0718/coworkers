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

<<<<<<< HEAD
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      setAccessToken: (token) =>
        set(() => {
          localStorage.setItem('accessToken', token);
          return { accessToken: token, isLoggedIn: true };
        }),
      logout: () =>
        set(() => {
          localStorage.removeItem('accessToken');
          return { accessToken: null, isLoggedIn: false };
        }),
    }),
    {
      name: 'auth-storage',
      skipHydration: false,
=======
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
>>>>>>> 0cb0444af07e25e2ea36b72e29e86c6c89d6bbd4
    }
  },
}));
