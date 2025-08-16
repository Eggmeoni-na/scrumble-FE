import { css, Theme } from '@emotion/react';

export const descStyle = (theme: Theme) => css`
  color: ${theme.colors.black.black300};
`;

export const inputStyle = (theme: Theme) => css`
  width: 100%;
  height: 40px;
  border: 1.5px solid #dfdfdf;
  border-radius: 6px;
  margin: 16px 0;
  padding: 0 8px;
  ${theme.typography.size_16}
`;
