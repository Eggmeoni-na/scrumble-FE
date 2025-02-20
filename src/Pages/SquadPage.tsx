import { Button, EmptyContent } from '@/components/common';
import { useCreateSquad } from '@/hooks/mutations';
import { squadQueryOptions } from '@/hooks/queries';
import { useToastStore } from '@/stores';
import { breakpoints, pcMediaQuery } from '@/styles/breakpoints';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { Squad } from '@/types/squad';
import { css, Theme } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

const SquadPage = () => {
  const navigate = useNavigate();
  const createToast = useToastStore((state) => state.createToast);
  const { data: squadList } = useSuspenseQuery(squadQueryOptions()).data;
  const { CreateSquadModal, handleCreateSquad } = useCreateSquad({
    onSuccess: async ({ data }) => {
      navigate(`/squads/${data.squadId}`);
      createToast({ type: 'success', message: '스쿼드가 생성되었어요 🎉', duration: 2000, showCloseButton: false });
    },
    onError: () => {
      createToast({ type: 'failed', message: '스쿼드 생성에 실패했어요 😢' });
    },
  });

  return (
    <>
      <div css={headerStyle}>
        <span>스쿼드</span>
        <Button text="스쿼드 생성" onClick={handleCreateSquad} aria-label="스쿼드 생성" />
      </div>
      {squadList.length ? (
        <ul>
          {squadList.map((squad) => (
            <SquadItem key={squad.squadId} squad={squad} />
          ))}
        </ul>
      ) : (
        <EmptyContent message="참여중인 스쿼드가 없어요" css={blankStyle} />
      )}
      <CreateSquadModal />
    </>
  );
};

export default SquadPage;

const SquadItem = ({ squad }: { squad: Squad }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    startTransition(() => {
      navigate(`/squads/${squad.squadId}`);
    });
  };

  return (
    <li css={itemStyle}>
      <button onClick={handleNavigation} style={fullSizeButtonStyle} aria-label={`${squad.squadName} 스쿼드 선택`}>
        {squad.squadName}
      </button>
    </li>
  );
};

const itemStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52px;
  margin: 8px 16px;
  border-radius: 8px;
  background-color: ${theme.colors.background.lightYellow};
  box-shadow: 0px 3px 28px 0px rgba(37, 37, 37, 0.05);
  cursor: pointer;
  max-width: ${breakpoints.mobile};

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
  `)}

  & button {
    ${theme.typography.size_16}
  }
`;

const headerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 16px;

  & span {
    ${theme.typography.size_24};
    padding-left: 16px;
  }

  & button {
    width: 112px;
    ${theme.typography.size_18};
    background-color: var(--color-primary);
    color: white;
  }
`;

const blankStyle = css`
  height: calc(100% - 84px);

  & p {
    margin-bottom: 84px;
  }
`;
