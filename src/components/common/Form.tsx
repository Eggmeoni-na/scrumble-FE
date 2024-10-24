import { Add } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { css, SerializedStyles, Theme } from '@emotion/react';
import { ChangeEvent, FormEvent, HTMLInputTypeAttribute, KeyboardEvent } from 'react';

type Props = {
  type: HTMLInputTypeAttribute;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLFormElement>) => void;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: (theme: Theme) => SerializedStyles;
};

const Form = ({ type, onSubmit, onKeyDown, value, onChange, placeholder, style }: Props) => {
  return (
    <form css={[formStyle, style]} onSubmit={onSubmit}>
      <input type={type} value={value} onChange={onChange} autoFocus placeholder={placeholder} />
      <IconWrapper
        css={addIconStyle}
        onClick={() => {
          // Button 태그로 인식하기 위함
        }}
        onKeyDown={onKeyDown}
      >
        <Add />
      </IconWrapper>
    </form>
  );
};

export default Form;

const formStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.background.gray};
  border-radius: 18px;
  padding: 8px;

  & input {
    height: 40px;
    flex: 1;
    padding-left: 16px;
    color: ${theme.colors.text};
  }

  & input::placeholder {
    ${theme.typography.size_14}
    font-weight: 500;
    color: ${theme.colors.gray.gray200};
  }
`;

const addIconStyle = (theme: Theme) => css`
  width: 32px;
  height: 32px;
  background-color: ${theme.colors.secondary};
  border-radius: 14px;
  margin-right: 8px;

  & svg {
    color: white;
    width: 24px;
    height: 24px;
  }
`;
