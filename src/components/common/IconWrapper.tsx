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
} & { theme: Theme };

const IconWrapper = ({ children, onClick, name, disabled = false, customStyle }: Props) => (
  <div
    css={(theme) => [customStyle ? customStyle : icon({ disabled, theme })]}
    onClick={onClick}
    aria-label={name}
    role="icon"
  >
    {children}
  </div>
);
export default IconWrapper;

const icon = ({ disabled, theme }: IconProps) => css`
  width: 36px;
  height: 36px;
  padding: 4px;
  stroke: ${theme.colors.text};
  stroke-width: 0.1;
  visibility: ${disabled ? 'hidden' : 'visible'};
  transition: all 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
  cursor: pointer;
`;
