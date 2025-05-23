import { create } from 'zustand';

interface Team {
  id: string;
  name: string;
  image?: string | null;
}

interface UserState {
  nickname: string | null;
  profileImage: string | null;
  teams: Team[];
  isInitialized: boolean;
  setUserInfo: (data: { nickname: string; profileImage: string | null; teams: Team[] }) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: null,
  profileImage: null,
  teams: [],
  isInitialized: false,
  setUserInfo: (data) =>
    set((prev) => ({
      ...prev,
      ...data,
      isInitialized: true,
    })),
  clearUserInfo: () => {
    set({ nickname: null, profileImage: null, teams: [], isInitialized: false });
  },
}));
