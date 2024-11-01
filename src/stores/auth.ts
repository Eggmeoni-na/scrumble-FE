import { AuthUser } from '@/types';
import { create } from 'zustand';

type AuthStore = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user: AuthUser) => set({ user }),
  logout: () => set({ user: null }),
}));
