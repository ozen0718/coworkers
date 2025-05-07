import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

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
      name: 'auth-storage', // localStorage key
      skipHydration: true,
    }
  )
);
