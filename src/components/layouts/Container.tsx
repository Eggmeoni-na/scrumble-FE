import { breakpoints } from '@/styles';
import { pcMediaQuery } from '@/styles/breakpoints';
import { css } from '@emotion/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => <div css={containerStyles}>{children}</div>;

export default Container;

const containerStyles = css`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  max-width: ${breakpoints.mobile};

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
  `)}
`;
