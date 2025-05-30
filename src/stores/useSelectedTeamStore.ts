import { create } from 'zustand';

interface Team {
  id: string;
  name: string;
  image?: string | null;
}

interface SelectedTeamState {
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team | null) => void;
}

export const useSelectedTeamStore = create<SelectedTeamState>((set) => ({
  selectedTeam: null,
  setSelectedTeam: (team) => set({ selectedTeam: team }),
}));
