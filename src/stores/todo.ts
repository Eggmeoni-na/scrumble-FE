import { format } from 'date-fns';
import { create } from 'zustand';

type TodoState = {
  lastToDoId: number;
  setLastToDoId: (todoId: number) => void;
};

export const useTodoStore = create<TodoState>((set) => ({
  lastToDoId: Number.MAX_SAFE_INTEGER,
  setLastToDoId: (lastToDoId) => set({ lastToDoId }),
}));

type DateState = {
  selectedDay: string;
  setSelectedDay: (date: string) => void;
};

export const useDayStore = create<DateState>((set) => ({
  selectedDay: format(new Date(), 'yyyy-MM-dd'),
  setSelectedDay: (day: string) => set({ selectedDay: day }),
}));
