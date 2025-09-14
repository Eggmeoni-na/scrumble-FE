import { pcMediaQuery } from '@/styles/breakpoints';
import { css, Theme } from '@emotion/react';

export const containerStyle = (theme: Theme) => css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  & div {
    width: 64px;
    height: 64px;
    color: ${theme.colors.gray.gray200};
  }

  & p {
    ${theme.typography.size_18}
    font-weight: 700;
    color: ${theme.colors.gray.gray200};
  }

  ${pcMediaQuery(css`
    & p {
      ${theme.typography.size_24};
    }
  `)}
`;
