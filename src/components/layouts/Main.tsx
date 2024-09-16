import { css } from '@emotion/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Main = ({ children }: Props) => {
  return <main css={MainContainer}>{children}</main>;
};

export default Main;

const MainContainer = css`
  flex: 1;
`;
