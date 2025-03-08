import { breakpoints } from '@/styles';
import { pcMediaQuery } from '@/styles/breakpoints';
import { css, Theme } from '@emotion/react';

export const itemStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52px;
  margin: 8px 16px;
  border-radius: 8px;
  background-color: ${theme.colors.background.lightYellow};
  box-shadow: 0px 3px 28px 0px rgba(37, 37, 37, 0.05);
  cursor: pointer;
  max-width: ${breakpoints.mobile};

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
  `)}

  & button {
    ${theme.typography.size_16}
  }
`;

export const headerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 16px;

  & span {
    ${theme.typography.size_24};
    padding-left: 16px;
  }
`;

export const blankStyle = css`
  height: calc(100% - 84px);

  & p {
    margin-bottom: 84px;
  }
`;

export const createSquadButtonStyle = (theme: Theme) => css`
  width: 112px;
  ${theme.typography.size_16}
  font-weight: 700;
  background-color: var(--color-primary);
  color: white;
`;
