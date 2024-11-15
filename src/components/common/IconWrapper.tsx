import { css, Theme } from '@emotion/react';
import { ElementType, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  customStyle?: (theme: Theme) => ReturnType<typeof css>;
} & HTMLAttributes<HTMLElement>;

type IconProps = {
  disabled?: boolean;
};

const IconWrapper = ({ children, onClick, disabled = false, customStyle, ...rest }: Props) => {
  const Wrapper: ElementType = onClick ? 'button' : 'div';
  return (
    <Wrapper css={[customStyle ? customStyle : icon({ disabled })]} onClick={onClick ? onClick : undefined} {...rest}>
      {children}
    </Wrapper>
  );
};
export default IconWrapper;

const icon = ({ disabled }: IconProps) => css`
  display: flex;
  align-content: center;
  width: 32px;
  height: 32px;
  padding: 4px;
  stroke-width: 0.1;
  transition: all 0.3s ease-in-out;
  display: ${disabled ? 'none' : 'block'};
  transition: transform 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }

  svg {
    width: 100%;
    height: 100%;
    transition: inherit;
  }
`;
