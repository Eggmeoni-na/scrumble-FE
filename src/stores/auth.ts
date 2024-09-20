import { User } from '@/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      login: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-state',
    },
  ),
);
