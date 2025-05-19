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
    console.log('[AuthStore] 🔑 setAccessToken 호출, token:', token);
    localStorage.setItem('accessToken', token);
    set({ accessToken: token, isLoggedIn: true });
    console.log('[AuthStore] ✅ Zustand에 accessToken 세팅 완료:', useAuthStore.getState());
  },

  logout: () => {
    console.log('[AuthStore] 🔒 logout 호출 — 사용자 세션 종료');
    localStorage.removeItem('accessToken');
    set({ accessToken: null, isLoggedIn: false });
    useUserStore.getState().setUserInfo({
      nickname: '',
      profileImage: null,
      teams: [],
    });
    console.log('[AuthStore] 🔒 userStore 초기화 후 상태:', useUserStore.getState());
  },

  initializeAuth: () => {
    console.log('[AuthStore] ⚙️ initializeAuth 시작');
    const storedToken = localStorage.getItem('accessToken');
    console.log('[AuthStore] ⚙️ localStorage 에서 읽힌 token:', storedToken);
    if (storedToken) {
      set({ accessToken: storedToken, isLoggedIn: true });
      console.log('[AuthStore] ⚙️ Zustand에 토큰 초기화 완료:', useAuthStore.getState());
    } else {
      console.log('[AuthStore] ⚙️ 토큰이 없어서 초기화 스킵');
    }
  },

  clearTokens: () => {
    console.log('[AuthStore] ✂️ clearTokens 호출');
    get().logout();
  },
}));
