import { css } from '@emotion/react';
import { BarLoader } from 'react-spinners';

const Loading = () => (
    <div css={spinnerContainer}>
      <BarLoader color="#ffa500" />
    </div>
  );

export default Loading;

const spinnerContainer = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
