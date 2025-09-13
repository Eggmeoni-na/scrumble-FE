import { darkColors, lightColors } from '@/styles/palette';
import { typography } from '@/styles/typography';
import { Theme } from '@emotion/react';

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  typography,
  breakpoints: {
    mobile: '480px',
    pc: '1024px',
  },
  shadow: {
    light: '0 2px 6px rgba(0,0,0,0.08)',
    dark: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkColors,
  typography,
  breakpoints: {
    mobile: '480px',
    pc: '1024px',
  },
  shadow: {
    light: '0 2px 6px rgba(0,0,0,0.08)',
    dark: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
  },
};
