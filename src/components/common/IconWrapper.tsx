import { css, Theme } from '@emotion/react';
import { ElementType, HTMLAttributes, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
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
  justify-content: space-between;
  align-items: center;
  width: 36px;
  height: 36px;
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
