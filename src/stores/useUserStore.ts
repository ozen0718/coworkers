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
  isInitialized: boolean; // ✅ 추가
  setUserInfo: (data: { nickname: string; profileImage: string | null; teams: Team[] }) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: null,
  profileImage: null,
  teams: [],
  isInitialized: false, // ✅ 초기값 false
  setUserInfo: ({ nickname, profileImage, teams }) => {
    set({ nickname, profileImage, teams, isInitialized: true }); // ✅ 초기화 완료 시 true로 변경
  },
  clearUserInfo: () => {
    set({ nickname: null, profileImage: null, teams: [], isInitialized: false }); // ✅ 초기화 해제
  },
}));
