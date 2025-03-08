import { breakpoints } from '@/styles';
import { pcMediaQuery } from '@/styles/breakpoints';
import { scrollBarStyle } from '@/styles/globalStyles';
import { typography } from '@/styles/typography';
import { css, Theme } from '@emotion/react';

export const calendarStyle = css`
  display: flex;
  gap: 4px;
  margin: 8px 16px;
  overflow-x: auto;

  ${scrollBarStyle}
`;

export const calendarItemStyle = (theme: Theme, isSelected: boolean) => css`
  width: 32px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 14px;
  color: ${theme.colors.text};
  background-color: ${theme.colors.background.white};
  border: 2px solid ${theme.colors.gray.gray100};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: ${!isSelected && theme.colors.background.yellow};
    cursor: ${isSelected && 'default'};
  }
`;

export const calendarButtonStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const todayStyle = (theme: Theme, isSelected: boolean) => css`
  color: ${isSelected ? 'white' : theme.colors.primary};
  border: 2px solid ${theme.colors.primary};
`;

export const selectedDateStyle = (theme: Theme) => css`
  background-color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};

  & button {
    color: #1b1b52;
  }
`;

export const dayNameStyle = css`
  ${typography.size_10}
  font-weight: 500;
`;

export const monthNavButtonStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${breakpoints.mobile};
  margin: 8px auto;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 28px;
    border: 2px solid ${theme.colors.gray.gray100};
    border-radius: 4px;
    ${theme.typography.size_14}
    font-weight: 500;
  }

  & button {
    width: 28px;
    height: 28px;
    border: 2px solid ${theme.colors.gray.gray100};
    border-radius: 4px;
    color: ${theme.colors.text};
    cursor: pointer;
    margin: 0 16px;

    transition: transform 0.3s ease-in-out;
    :hover {
      transform: scale(1.1);
      background-color: #eeeeee70;
    }
  }

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
    margin: 8px 150px;
  `)}
`;
