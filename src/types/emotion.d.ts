import { TypeOfThemeColors } from '@/styles/palette';
import { TypeOfTypography } from '@/styles/typography';
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: TypeOfThemeColors;
    typography: TypeOfTypography;
  }
}
