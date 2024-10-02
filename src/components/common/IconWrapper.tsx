import { css, Theme } from '@emotion/react';
import { ElementType, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  role?: 'button' | 'icon';
  label: string;

  disabled?: boolean;
  customStyle?: (theme: Theme) => ReturnType<typeof css>;
};

type IconProps = {
  disabled?: boolean;
};

const IconWrapper = ({ children, onClick, label, role = 'button', disabled = false, customStyle }: Props) => {
  const Wrapper: ElementType = role === 'button' ? 'button' : 'div';
  return (
    <Wrapper
      css={[customStyle ? customStyle : icon({ disabled })]}
      onClick={role === 'button' && onClick ? onClick : undefined}
      aria-label={label}
      role={role}
    >
      {children}
    </Wrapper>
  );
};
export default IconWrapper;

const icon = ({ disabled }: IconProps) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  all: unset;
  width: 28px;
  height: 28px;
  padding: 4px;
  stroke-width: 0.1;
  transition: all 0.3s ease-in-out;
  visibility: ${disabled ? 'hidden' : 'visible'};
  transition: transform 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    transition: inherit;
  }
`;
