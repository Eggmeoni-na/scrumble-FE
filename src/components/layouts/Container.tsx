import { breakpoints } from '@/styles';
import { css } from '@emotion/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return <div css={containerStyles}>{children}</div>;
};

export default Container;

const containerStyles = css`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;

  @media (min-width: ${breakpoints.mobile}) {
    max-width: ${breakpoints.mobile};
  }

  @media (min-width: ${breakpoints.pc}) {
    max-width: ${breakpoints.pc};
    border: 2px solid red; // 구분용 - 삭제 예정
  }
`;
