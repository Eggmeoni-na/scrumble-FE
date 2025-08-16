import { css, Theme } from '@emotion/react';

export const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 32px;
  padding: 24px 0;

  & h1 {
    ${theme.typography.size_24}
    margin-bottom: 12px;
  }
`;

export const userInfoStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  & div {
    display: flex;
  }

  & p {
    flex: 2;
    margin-top: 12px;
  }
`;

export const logoutButtonStyle = (theme: Theme) => css`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.black.black300};
  flex: 0.5;
`;

export const nicknameStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 24px;

  & p {
    height: 12px;
  }

  & div {
    display: flex;
    align-items: center;
  }

  & input {
    width: 100%;
    height: 40px;
    max-width: 240px;
    background-color: #fff;
    border-radius: 6px;
    margin: 16px 8px 16px 0;
    padding: 0 8px;
  }
`;

export const editNicknameActionStyle = css`
  display: flex;
  align-items: center;

  & button {
    width: 72px;
    height: 40px;
    margin-right: 4px;
  }
`;

export const deleteUserButtonStyle = (theme: Theme) => css`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: auto;

  & span {
    color: ${theme.colors.gray.gray200};
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }
  }
`;
