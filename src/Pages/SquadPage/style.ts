import { pcMediaQuery } from '@/styles/breakpoints';
import { css, Theme } from '@emotion/react';

export const listStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
`;

export const itemStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  border-radius: 16px;
  padding: 12px 16px;
  cursor: pointer;
  max-width: ${theme.breakpoints.mobile};

  background-color: ${theme.colors.background.white};
  color: ${theme.colors.text};
  border: 1px solid ${theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};

  box-shadow: ${theme.mode === 'dark' ? theme.shadow.dark : theme.shadow.light};

  ${pcMediaQuery(css`
    max-width: ${theme.breakpoints.pc};
  `)}

  & button {
    ${theme.typography.size_16}
    color: inherit;
    text-shadow: ${theme.mode === 'dark' ? '0 1px 2px rgba(0, 0, 0, 0.5)' : 'none'};
  }

  &:hover {
    background-color: ${theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'};
    box-shadow: ${theme.mode === 'dark'
      ? '0 4px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)'
      : '0 4px 12px rgba(0,0,0,0.12)'};
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
