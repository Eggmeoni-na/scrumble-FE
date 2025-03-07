import { Calendar } from '@/components/common';
import { SquadDetailMemberList } from '@/components/Member';
import { Todo, Form as TodoForm } from '@/components/Todo';
import { TODO_PAGE_SIZE, TODO_STATUS } from '@/constants/todo';
import { TodoProvider } from '@/context/todo/provider';
import { useUserCookie } from '@/hooks';
import { squadDetailQueryOptions, todoInfiniteQueryOptions } from '@/hooks/queries';
import { useDayStore, useMemberStore, useSquadStore } from '@/stores';
import { pcMediaQuery } from '@/styles/breakpoints';
import { ellipsisStyle } from '@/styles/globalStyles';
import { TodoQueryParams } from '@/types';
import { css, Theme } from '@emotion/react';
import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
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

  const payload = {
    startDate: selectedDay,
    endDate: selectedDay,
    pageSize: TODO_PAGE_SIZE,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch: refetchTodos,
  } = useInfiniteQuery(todoInfiniteQueryOptions(squadMemberId, squadId, selectedDay, payload));

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
    setSelectedMember(me || null);
  }, []);

  useEffect(() => {
    refetchSquadDetail();
    refetchTodos();
  }, []);

  useEffect(() => {
    const isCompleted = todos.filter((todo) => todo.toDoStatus === TODO_STATUS.COMPLETED).length;
    const newProgressRate = !todoCount ? 0 : Math.floor((isCompleted / todoCount) * 100);

    if (newProgressRate !== progressRate) {
      setProgressRate(newProgressRate);
    }
  }, [todos, todoCount, progressRate]);

  return (
    <section css={containerStyle}>
      <Calendar onChangeSelectedDay={setSelectedDay} />

      <section aria-labelledby="squad-members">
        <h2 id="squad-members" className="sr-only">
          멤버
        </h2>
        <SquadDetailMemberList squadMembers={squadDetail.squadMembers} />
      </section>

      <header css={headerStyle}>
        <span style={{ width: '90px' }}>{selectedDay}</span>
        <span
          css={ellipsisStyle}
          style={{
            width: '112px',
          }}
        >
          {!selectedMember ? user?.name : selectedMember.name}
        </span>
        <span css={completionRateStyle}>달성률: {progressRate}%</span>
      </header>

      <TodoProvider queryParams={queryParams}>
        <Todo todos={todos} loadMoreTodos={loadMoreTodos} hasNextPage={hasNextPage} isMeSelected={isMeSelected} />
      </TodoProvider>

      {isMeSelected && (
        <section aria-labelledby="todo-form">
          <h2 id="todo-form" className="sr-only">
            투두 작성 폼
          </h2>
          <TodoForm squadId={squadId} selectedDay={selectedDay} squadMemberId={squadMemberId} />
        </section>
      )}
    </section>
  );
};

export default SquadDetailPage;

const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${theme.colors.background.white};
`;

const headerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 24px 12px 32px;
  ${theme.typography.size_14}
  font-weight: 500;

  ${pcMediaQuery(css`
    ${theme.typography.size_16}
  `)}
`;

const completionRateStyle = css`
  width: 90px;
  text-align: right;
`;
