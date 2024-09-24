import { Theme } from '@emotion/react';

export const lightTheme: Theme = {
  colors: {
    primary: '#FFA500',
    secondary: '#FFD700',
    background: {
      white: '#ffffff',
      yellow: '#FFFACD',
      lightYellow: '#FFFEF6',
    },
    text: '#24272B',
    border: {
      gray100: '#e0e0e0',
      gray200: '#bdbdbd',
      gray300: '#9e9e9e',
    },
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#FFA500',
    secondary: '#FFD700',
    background: {
      white: '#1B1C1D',
      yellow: '#34373B',
      lightYellow: '#24272B',
    },
    text: '#ffffff',
    border: {
      gray100: '#7F7F7F',
      gray200: '#B1B1B1',
      gray300: '#C9C9C9',
    },
  },
};
