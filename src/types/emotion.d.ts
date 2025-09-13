import { TypeOfThemeColors } from '@/styles/palette';
import { TypeOfTypography } from '@/styles/typography';
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    mode: 'light' | 'dark';
    colors: TypeOfThemeColors;
    typography: TypeOfTypography;
    breakpoints: {
      mobile: string;
      pc: string;
    };
    shadow: {
      light: string;
      dark: string;
    };
  }
}
