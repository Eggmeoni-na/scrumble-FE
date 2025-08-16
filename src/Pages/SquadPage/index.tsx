import { Button, EmptyContent } from '@/components/common';
import { useCreateSquad } from '@/hooks/mutations';
import { squadQueryOptions } from '@/hooks/queries';
import SquadItem from '@/Pages/SquadPage/SquadItem';
import { blankStyle, createSquadButtonStyle, headerStyle } from '@/Pages/SquadPage/style';
import { useToastStore } from '@/stores';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const SquadPage = () => {
  const navigate = useNavigate();
  const createToast = useToastStore((state) => state.createToast);
  const { data } = useSuspenseQuery(squadQueryOptions()).data;
  const { CreateSquadModal, handleCreateSquad } = useCreateSquad({
    onSuccess: async ({ data }) => {
      navigate(`/squads/${data.squadId}`);
      createToast({ type: 'success', message: '스쿼드가 생성되었어요 🎉', duration: 2000, showCloseButton: false });
    },
    onError: () => {
      createToast({ type: 'failed', message: '스쿼드 생성에 실패했어요 😢' });
    },
  });

  const squadList = useMemo(() => data.map((squad) => <SquadItem key={squad.squadId} squad={squad} />), [data]);

  return (
    <>
      <div css={headerStyle}>
        <span>스쿼드</span>
        <Button text="스쿼드 생성" onClick={handleCreateSquad} customCss={createSquadButtonStyle} />
      </div>
      {squadList.length ? <ul>{squadList}</ul> : <EmptyContent message="참여중인 스쿼드가 없어요" css={blankStyle} />}
      <CreateSquadModal />
    </>
  );
};

export default SquadPage;
