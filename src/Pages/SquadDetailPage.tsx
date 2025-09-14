import Calendar from '@/components/Calendar';
import { SquadDetailMemberList } from '@/components/Member';
import { TodoContainer, TodoForm } from '@/components/Todo';
import { useUserCookie } from '@/hooks';
import { squadDetailQueryOptions } from '@/hooks/queries';
import { useDayStore, useMemberStore, useSquadStore } from '@/stores';
import { TodoQueryParams } from '@/types';
import { css, Theme } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

const SquadDetailPage = () => {
  const params = useParams();
  const squadId = Number(params.squadId);

  const setCurrentSquadId = useSquadStore((state) => state.setCurrentSquadId);
  const { user } = useUserCookie();
  const { selectedDay, setSelectedDay } = useDayStore((state) => state);
  const { selectedMember, setSelectedMember } = useMemberStore((state) => state);

  const {
    data: { data: squadDetail },
    refetch: refetchSquadDetail,
  } = useSuspenseQuery({
    ...squadDetailQueryOptions(squadId),
  });

  const me = squadDetail.squadMembers.find((member) => member.memberId === user?.id);
  const isMeSelected = !selectedMember || selectedMember.squadMemberId === me?.squadMemberId;
  const squadMemberId = isMeSelected ? me!.squadMemberId : selectedMember!.squadMemberId;

  const queryParams: TodoQueryParams = useMemo(
    () => ({
      squadId,
      selectedDay,
      squadMemberId,
    }),
    [squadId, selectedDay, squadMemberId],
  );

  // 스쿼드 목록에서 클릭 후 들어왔을 때 현재 스쿼드 id 재설정
  useEffect(() => {
    setCurrentSquadId(squadId);
  }, [squadId]);

  useEffect(() => {
    setSelectedMember(me || null);
  }, []);

  useEffect(() => {
    refetchSquadDetail();
  }, []);

  return (
    <section css={containerStyle}>
      <section aria-labelledby="squad-members">
        <h2 id="squad-members" className="sr-only">
          멤버
        </h2>
        <SquadDetailMemberList squadMembers={squadDetail.squadMembers} />
      </section>

      <Calendar selectedDate={new Date(selectedDay)} onDateChange={setSelectedDay} queryParams={queryParams} />

      {isMeSelected && (
        <section aria-labelledby="todo-form">
          <h2 id="todo-form" className="sr-only">
            투두 작성 폼
          </h2>
          <TodoForm squadId={squadId} selectedDay={selectedDay} squadMemberId={squadMemberId} />
        </section>
      )}

      <TodoContainer isMeSelected={isMeSelected} queryParams={queryParams} />
    </section>
  );
};

export default SquadDetailPage;

const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;

  background-color: ${theme.colors.background.white};
  overflow: auto;
`;
