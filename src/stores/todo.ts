import { format } from 'date-fns';
import { create } from 'zustand';

type DateState = {
  selectedDay: string;
  setSelectedDay: (date: string) => void;
};

export const useDayStore = create<DateState>((set) => ({
  selectedDay: format(new Date(), 'yyyy-MM-dd'),
  setSelectedDay: (day: string) => set({ selectedDay: day }),
}));
