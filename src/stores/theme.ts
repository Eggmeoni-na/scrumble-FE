import { darkTheme, lightTheme } from '@/styles/theme';
import { Theme } from '@emotion/react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: lightTheme,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === lightTheme ? darkTheme : lightTheme,
        })),
    }),
    {
      name: 'theme',
    },
  ),
);
