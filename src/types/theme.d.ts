import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: {
        white: string;
        yellow: string;
        lightYellow: string;
      };
      text: string;
    };
  }
}
