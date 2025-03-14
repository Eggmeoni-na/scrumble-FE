import { pcMediaQuery } from '@/styles/breakpoints';
import { css, keyframes, Theme } from '@emotion/react';

export const todoContainerStyle = (theme: Theme) => css`
  background-color: ${theme.colors.background.gray};
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  margin: 0 16px;
  padding: 8px 0;
  border-radius: 24px;
  overflow-y: auto;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
`;

export const memberTodoListStyle = css`
  margin-bottom: 24px;
`;

export const todoItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  margin: 0 8px;
  padding: 8px 0 8px 8px;
  min-height: 48px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease-out;

  & button,
  div {
    font-size: 0.8rem;
  }

  ${pcMediaQuery(css`
    & button,
    div {
      font-size: 1rem;
    }
  `)}
`;

export const contentWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
`;

export const getStatusStyles = (isChecked: boolean, theme: Theme) => {
  switch (isChecked) {
    case true:
      return css`
        outline: 1.5px solid ${theme.colors.primary};
        background-color: ${theme.colors.background.lightYellow};
      `;
    default:
      return css`
        background-color: ${theme.colors.background.white};
      `;
  }
};

export const completedContentStyle = (theme: Theme) => css`
  color: ${theme.colors.gray.gray200};
  text-decoration: line-through ${theme.colors.gray.gray200};
  text-decoration-thickness: 1.5px;
`;

export const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const deleteModeStyle = css`
  animation: ${slideInFromRight} 0.3s ease-out;

  & button {
    font-weight: 500;
    text-align: center;
    border-radius: 12px;
    color: white;
  }
`;

export const deleteButtonStyle = css`
  background-color: #ff5a5a;
`;

export const cancelButtonStyle = css`
  width: 56px;
  height: 100%;
  background-color: #dfdfdf;
  border-radius: 8px;
  margin-right: 8px;

  & svg {
    width: 20px;
    color: var(--color-text-gray);
  }
`;

export const actionStyle = css`
  display: flex;
  gap: 4px;
  margin-right: 8px;

  & button {
    color: #bbbbbb;
  }
`;

export const editInputStyle = (theme: Theme) => css`
  height: 100%;
  padding-left: 8px;
  flex: 1;
  font-size: 0.8rem;
  color: var(--color-text-gray);

  ${pcMediaQuery(css`
    ${theme.typography.size_16}
  `)}
`;

export const editActionStyle = css`
  width: 112px;
  display: flex;
  gap: 4px;
  margin-right: 8px;
  text-decoration: none;

  & button {
    border-radius: 12px;
    text-align: center;
    font-weight: 500;
  }
`;

export const formStyle = () => css`
  margin: 16px;
`;
