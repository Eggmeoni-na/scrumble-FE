import { css, Theme } from '@emotion/react';

export const commonButtonStyle = (theme: Theme) => css`
  width: 28px;
  height: 28px;
  color: ${theme.colors.text};
`;

export const sidebarContainer = (theme: Theme) => css`
  width: 300px;
  height: 100%;
  background-color: ${theme.colors.background.white};
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;

  & h2 {
    ${theme.typography.size_18}
    font-weight: 600;
  }

  & h2::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.gray.gray100};
    margin-top: 8px;
  }
`;

export const headerStyle = (theme: Theme) => css`
  ${theme.typography.size_24}
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 16px;
`;

export const squadInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0;
  padding: 0 16px;

  & h3 {
    font-weight: 400;
  }

  & div {
    display: flex;
    gap: 4px;
    align-items: center;
  }
`;

export const membersStyle = css`
  padding: 0 16px;
  margin-bottom: 24px;

  & h2 {
    margin-bottom: 12px;
  }
`;

export const settingsStyle = (theme: Theme) => css`
  padding: 0 16px;
  flex: 1;
  margin-bottom: 24px;

  & h2 {
    margin-bottom: 12px;
  }

  & li {
    padding: 8px 0;
    cursor: pointer;
  }

  & li:hover {
    opacity: 0.5;
  }

  & button {
    text-align: left;
    ${theme.typography.size_16}
  }
`;

export const exitButtonStyle = (theme: Theme) => css`
  background-color: ${theme.colors.background.white};
  ${theme.typography.size_14}
  color: ${theme.colors.gray.gray200};
  border-top: 1px solid ${theme.colors.gray.gray200};
  font-weight: 700;
  margin-top: auto;
  height: 56px;
  text-align: left;
  padding: 12px 16px;
`;
