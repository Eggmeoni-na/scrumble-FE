import { buttonStyle, getVariantStyles, Variant } from '@/components/common/Button/style';
import { SerializedStyles, Theme } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  text: string;
  variant?: Variant;
  customCss?: (theme: Theme) => SerializedStyles;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, variant = 'default', onClick, customCss, ...rest }: ButtonProps) => (
  <button css={[buttonStyle, getVariantStyles(variant), customCss]} onClick={onClick} {...rest}>
    {text}
  </button>
);

export default Button;
