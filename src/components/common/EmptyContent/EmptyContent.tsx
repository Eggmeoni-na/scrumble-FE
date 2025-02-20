import { pcMediaQuery } from '@/styles/breakpoints';
import { css, Theme } from '@emotion/react';
import { HTMLAttributes } from 'react';

const EmptyContent = ({ message, ...rest }: { message: string } & HTMLAttributes<HTMLElement>) => (
  <div css={containerStyle} {...rest}>
    <span>🪹</span>
    <p>{message}</p>
  </div>
);

export default EmptyContent;

const containerStyle = (theme: Theme) => css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & span {
    display: inline-block;
    font-size: 8rem;
  }

  & p {
    ${theme.typography.size_18}
    font-weight: 700;
    color: ${theme.colors.primary};
  }

  ${pcMediaQuery(css`
    & p {
      ${theme.typography.size_24};
    }
  `)}
`;
