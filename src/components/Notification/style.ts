import { scrollBarStyle } from '@/styles/globalStyles';
import { css, Theme } from '@emotion/react';

export const listStyle = css`
  margin-top: 24px;
  overflow-y: auto;

  ${scrollBarStyle}
`;

export const itemStyle = (theme: Theme) => css`
  height: 56px;
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  ${theme.typography.size_14}
  font-weight: 400;
  flex: 2;

  & p {
    width: 100%;
    text-align: left;
  }

  & button {
    width: 56px;
  }

  :hover {
    background-color: #e2e2e250;
    cursor: pointer;
  }
`;

export const markStyle = (isRead: boolean) => css`
  ::before {
    opacity: ${isRead && 0};
    content: '';
    width: 8px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    margin-top: 8px;
  }
`;

export const buttonStyle = () => css`
  opacity: 50%;
  pointer-events: none;
`;

export const acceptIconStyle = css`
  width: 56px;
  display: flex;
  justify-content: center;
`;

export const checkIconStyle = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: 'var(--color-success)',
  color: '#fff',
  padding: '4px',
};
