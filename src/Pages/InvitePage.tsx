import { getSearchMember } from '@/apis';
import { Check } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { Button, Form } from '@/components/common';
import { useToastHandler } from '@/hooks';
import { useInviteMember } from '@/hooks/mutations';
import { useSquadStore } from '@/stores';
import { checkedStyle, checkIconStyle } from '@/styles/common';
import { SearchMemberResponse } from '@/types';
import { css, Theme, useTheme } from '@emotion/react';
import { FormEvent, KeyboardEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InvitePage = () => {
  const squadId = useSquadStore((state) => state.currentSquadId);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<SearchMemberResponse | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { successToast, warningToast, failedToast } = useToastHandler();
  const theme = useTheme();
  const navigate = useNavigate();
  const { inviteMemberMutate } = useInviteMember({
    onSuccess: () => successToast('멤버 초대에 성공했어요.'),
    onError: () => failedToast('멤버 초대에 실패했어요.'),
  });

  const isSearchEmpty = hasSearched && !searchResult;

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSearched(true);
    setSearchResult(null);

    if (!searchKeyword.length) {
      warningToast('이메일을 입력해주세요');
      return;
    }
    const res = await getSearchMember(searchKeyword);
    if (res.statusCodeValue !== 200) {
      failedToast('잠시 후 다시 시도해주세요');
      return;
    }
    setSearchResult(res.data);
    setSearchKeyword('');
  };

  const handleEnterSubmit: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key !== 'Enter') return;
    if (!e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSearch(e);
    }
  };

  const handleInvite = () => {
    if (!searchResult) {
      warningToast('초대할 멤버를 확인해주세요.');
      return;
    }
    inviteMemberMutate({ squadId, memberId: searchResult.memberId });
    navigate(-1);
  };

  return (
    <section css={containerStyle}>
      <Form
        type="email"
        onSubmit={handleSearch}
        onKeyDown={handleEnterSubmit}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={formStyle}
        placeholder="초대할 멤버의 이메일을 입력해주세요"
      />
      {searchResult && (
        <div
          css={[searchResultStyle(theme, isSelected)]}
          onClick={() => setIsSelected(!isSelected)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsSelected(!isSelected);
            }
          }}
          aria-label={searchResult.name}
          tabIndex={0}
          role="button"
        >
          <IconWrapper
            aria-label={isSelected ? '선택된 멤버' : '선택되지 않은 멤버'}
            aria-checked={isSelected}
            role="checkbox"
            css={[checkIconStyle, isSelected && checkedStyle, isSelected && customCheckedStyle]}
          >
            {isSelected && <Check />}
          </IconWrapper>
          <p>{searchResult.name}</p>
        </div>
      )}
      {isSearchEmpty && (
        <p css={emptyStyle}>
          사용자를 찾을 수 없어요😢 <br /> 계정 정보를 다시 확인해주세요.
        </p>
      )}
      <Button
        text="초대하기"
        onClick={handleInvite}
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

const customCheckedStyle = css`
  background-color: #409c2c;
`;

const emptyStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 22px;
`;
