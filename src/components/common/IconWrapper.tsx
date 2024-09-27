import { css, Theme } from '@emotion/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  name: string;
  disabled?: boolean;
  customStyle?: (theme: Theme) => ReturnType<typeof css>;
};

type IconProps = {
  disabled?: boolean;
};

const IconWrapper = ({ children, onClick, name, disabled = false, customStyle }: Props) => (
  <div css={[customStyle ? customStyle : icon({ disabled })]} onClick={onClick} aria-label={name} role="icon">
    {children}
  </div>
);
export default IconWrapper;

const icon = ({ disabled }: IconProps) => css`
  width: 36px;
  height: 36px;
  padding: 4px;
  stroke-width: 0.1;
  transition: all 0.3s ease-in-out;
  visibility: ${disabled ? 'hidden' : 'visible'};
  transition: transform 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
  cursor: pointer;
`;
