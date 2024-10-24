import { Check } from '@/assets/icons';
import Button from '@/components/common/Button/Button';
import Form from '@/components/common/Form';
import IconWrapper from '@/components/common/IconWrapper';
import { checkedStyle, checkIconStyle } from '@/components/common/Todo/TodoList';
import { css, Theme, useTheme } from '@emotion/react';
import { FormEvent, KeyboardEventHandler, useState } from 'react';

const InvitePage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const theme = useTheme();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchKeyword);
    setSearchKeyword('');
  };

  const handleEnterSubmit: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key !== 'Enter') return;
    if (!e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <section css={containerStyle}>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={handleEnterSubmit}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={formStyle}
        placeholder="초대할 멤버의 이메일을 입력해주세요"
      />
      <div css={[searchResultStyle(theme, isSelected)]} onClick={() => setIsSelected(!isSelected)}>
        <IconWrapper
          aria-label={isSelected ? 'Selected member' : 'Unselected member'}
          aria-checked={isSelected}
          role="checkbox"
          css={[checkIconStyle, isSelected && checkedStyle, isSelected && customCheckedStyle]}
        >
          {isSelected && <Check />}
        </IconWrapper>
        <p>김둘리</p>
      </div>
      <Button
        text="초대하기"
        onClick={() => {}}
        style={{
          marginTop: 'auto',
          height: '56px',
          fontSize: '1rem',
          opacity: `${!isSelected ? '0.5' : '1'}`,
          cursor: `${!isSelected ? 'default' : 'pointer'}`,
        }}
        disabled={!isSelected}
      />
    </section>
  );
};

export default InvitePage;

const containerStyle = (theme: Theme) => css`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background.white};
  padding: 16px;
`;

const formStyle = (theme: Theme) => css`
  border: 2px solid ${theme.colors.background.gray};
  padding: 4px;
  background-color: transparent;

  & input {
    ${theme.typography.size_16}
  }

  & button {
    background-color: ${theme.colors.gray.gray100};
  }

  & svg {
    color: #252525 !important;
  }
`;

const searchResultStyle = (theme: Theme, isSelected: boolean) => css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 16px;
  background-color: ${isSelected ? 'var(--color-success-bg)' : 'transparent'};
  border-radius: 16px;
  cursor: pointer;
  color: ${isSelected ? '#409C2C' : theme.colors.gray.gray300};

  & p {
    padding-top: 2px;
  }

  :hover {
    background-color: ${isSelected ? 'var(--color-success-bg)' : theme.colors.background.gray};
  }
`;

const customCheckedStyle = (theme: Theme) => css`
  background-color: #409c2c;
`;
