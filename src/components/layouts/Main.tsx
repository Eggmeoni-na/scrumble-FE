import { css, Theme } from '@emotion/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Main = ({ children }: Props) => {
  return <main css={mainContainer}>{children}</main>;
};

export default Main;

const mainContainer = (theme: Theme) => css`
  flex: 1;
  background-color: ${theme.colors.background.yellow};
  overflow: auto;
`;
