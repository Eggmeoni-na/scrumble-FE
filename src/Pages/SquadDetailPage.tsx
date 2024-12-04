import { Calendar } from '@/components/common';
import { SquadDetailMemberList } from '@/components/Member';
import { TodoForm, TodoList } from '@/components/Todo';
import { TODO_PAGE_SIZE, TODO_STATUS } from '@/constants/todo';
import { useUserCookie } from '@/hooks';
import { squadDetailQueryOptions, todoInfiniteQueryOptions, todoKeys } from '@/hooks/queries';
import { useDayStore, useMemberStore, useSquadStore } from '@/stores';
import { mobileMediaQuery, pcMediaQuery } from '@/styles/breakpoints';
import { css, Theme } from '@emotion/react';
import { useInfiniteQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SquadDetailPage = () => {
  const params = useParams();
  const squadId = Number(params.squadId);
  const setCurrentSquadId = useSquadStore((state) => state.setCurrentSquadId);
  const { user } = useUserCookie();
  const { selectedDay, setSelectedDay } = useDayStore((state) => state);
  const { selectedMember, setSelectedMember } = useMemberStore((state) => state);

  const { data: squadDetail } = useSuspenseQuery({
    ...squadDetailQueryOptions(squadId),
  }).data;

  const me = squadDetail?.squadMembers?.find((member) => member.memberId === user?.id);
  const isMeSelected = !selectedMember || selectedMember.squadMemberId === me?.squadMemberId;

  const queryClient = useQueryClient();

  const payload = {
    startDate: selectedDay,
    endDate: selectedDay,
    pageSize: TODO_PAGE_SIZE,
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    todoInfiniteQueryOptions(
      isMeSelected ? me!.squadMemberId : selectedMember!.squadMemberId,
      squadId,
      selectedDay,
      payload,
    ),
  );

  const todos = data ?? [];

  const [progressRate, setProgressRate] = useState(0);
  const todoCount = todos.length;

  const loadMoreTodos = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // 스쿼드 목록에서 클릭 후 들어왔을 때 현재 스쿼드 id 재설정
  useEffect(() => {
    setCurrentSquadId(squadId);
  }, [squadId]);

  useEffect(() => {
    setSelectedMember(null);
  }, []);

  useEffect(() => {
    const isCompleted = todos.filter((todo) => todo.toDoStatus === TODO_STATUS.COMPLETED).length;
    const newProgressRate = !todoCount ? 0 : Math.floor((isCompleted / todoCount) * 100);

    if (newProgressRate !== progressRate) {
      setProgressRate(newProgressRate);
    }
  }, [todos, todoCount, progressRate]);

  useEffect(
    () => () =>
      queryClient.removeQueries({
        queryKey: todoKeys.todos(squadId, selectedDay),
      }),
    [selectedDay, selectedMember],
  );

  return (
    <section css={containerStyle}>
      <Calendar onChangeSelectedDay={setSelectedDay} />
      <section aria-labelledby="squad-members">
        <h2 id="squad-members" className="sr-only">
          멤버
        </h2>
        <SquadDetailMemberList squadMembers={squadDetail.squadMembers} />
      </section>
      <div css={headerStyle}>
        <span>{selectedDay}</span>
        <span>{!selectedMember ? user?.name : selectedMember.name}</span>
        <span>달성률: {progressRate}%</span>
      </div>
      <TodoList todos={todos} loadMoreTodos={loadMoreTodos} hasNextPage={hasNextPage} isMeSelected={isMeSelected} />
      {isMeSelected && <TodoForm squadId={squadId} selectedDay={selectedDay} />}
    </section>
  );
};

export default SquadDetailPage;

const containerStyle = (them: Theme) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${them.colors.background.white};
`;

const headerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 24px 12px 32px;

  ${mobileMediaQuery(css`
    font-size: ${theme.typography.size_14};
    font-weight: 500;
  `)}

  ${pcMediaQuery(css`
    font-size: ${theme.typography.size_16};
    font-weight: 500;
  `)}
`;
