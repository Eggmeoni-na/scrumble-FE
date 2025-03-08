import { css } from '@emotion/react';

export type Variant = 'default' | 'primary' | 'confirm' | 'delete';

export const buttonStyle = css`
  width: 100%;
  height: 36px;
  border-radius: 6px;
  font-weight: 700;
  :hover {
    opacity: 0.5;
  }
`;

export const getVariantStyles = (variant: Variant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: var(--color-primary-bg);
        color: var(--color-primary);
      `;
    case 'confirm':
      return css`
        background-color: var(--color-success-bg);
        color: var(--color-success);
      `;
    case 'delete':
      return css`
        background-color: var(--color-failed-bg);
        color: var(--color-failed);
      `;
    default:
      return css`
        background-color: var(--color-default-bg);
        color: var(--color-text-gray);
      `;
  }
};
