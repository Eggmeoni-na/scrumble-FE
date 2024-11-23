import { css, Theme } from '@emotion/react';

const HomePage = () => (
    <div css={containerStyle}>
      <span>🪹</span>
      <p>보관함을 준비중이에요</p>
    </div>
  );

export default HomePage;

const containerStyle = (theme: Theme) => css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & span {
    display: inline-block;
    font-size: 12rem;
  }

  & p {
    ${theme.typography.size_24}
    color: ${theme.colors.primary};
    margin-bottom: 112px;
  }
`;
