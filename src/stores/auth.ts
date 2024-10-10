import { AuthUser } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      login: (user: AuthUser) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-state',
    },
  ),
);
