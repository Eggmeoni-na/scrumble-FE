import { create } from 'zustand';

type ProgressState = {
  progressByMember: Record<number, Record<string, number>>;
  setProgress: (memberId: number, date: string, progress: number) => void;
  getProgress: (memberId: number, date: string) => number;
};

export const useTodoProgressStore = create<ProgressState>((set, get) => ({
  progressByMember: {},

  setProgress: (memberId, date, progress) =>
    set((state) => ({
      progressByMember: {
        ...state.progressByMember,
        [memberId]: {
          ...(state.progressByMember[memberId] || {}),
          [date]: progress,
        },
      },
    })),

  getProgress: (memberId, date) => get().progressByMember[memberId]?.[date] ?? 0,
}));
