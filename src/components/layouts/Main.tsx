import { css } from '@emotion/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Main = ({ children }: Props) => {
  return <main css={mainContainer}>{children}</main>;
};

export default Main;

const mainContainer = css`
  flex: 1;
`;
