import { create } from 'zustand';

type SquadState = {
  currentSquadId: number;
  setCurrentSquadId: (squadId: number) => void;
};

export const useSquadStore = create<SquadState>((set) => ({
  currentSquadId: 0,
  setCurrentSquadId: (squadId) =>
    set((state) => ({
      ...state,
      currentSquadId: squadId,
    })),
}));
