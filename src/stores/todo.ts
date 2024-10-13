import { create } from 'zustand';

type TodoState = {
  isTodoChanged: boolean;
  setIsTodoChanged: (changed: boolean) => void;
};

export const useTodoStore = create<TodoState>((set) => ({
  isTodoChanged: false,
  setIsTodoChanged: (changed) => set({ isTodoChanged: changed }),
}));
