import CalendarList from '@/components/common/Calendar/CalendarList';
import { SquadDetailMemberList } from '@/components/common/Member';
import TodoForm from '@/components/common/Todo/TodoForm';
import TodoList from '@/components/common/Todo/TodoList';
import { TODO_PAGE_SIZE, TODO_STATUS } from '@/constants/todo';
import { squadDetailQueryOptions } from '@/hooks/queries/useSquad';
import { todoInfiniteQueryOptions, todoKeys } from '@/hooks/queries/useTodo';
import useUserCookie from '@/hooks/useUserCookie';
import { useDayStore, useMemberStore, useSquadStore } from '@/stores';
import { breakpoints, mobileMediaQuery, pcMediaQuery } from '@/styles/breakpoints';
import { css, Theme } from '@emotion/react';
import { useInfiniteQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { addMonths, format, subMonths } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SquadDetailPage = () => {
  const params = useParams();
  const squadId = Number(params.squadId);
  const setCurrentSquadId = useSquadStore((state) => state.setCurrentSquadId);
  const { user } = useUserCookie();
  const { selectedDay, setSelectedDay } = useDayStore((state) => state);
  const selectedMember = useMemberStore((state) => state.selectedMember);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDay));
  const isMeSelected = !selectedMember || selectedMember.memberId === user!.id;

  const queryClient = useQueryClient();

  const { data: squadDetail } = useSuspenseQuery({
    ...squadDetailQueryOptions(squadId),
  }).data;

  const payload = {
    startDate: selectedDay,
    endDate: selectedDay,
    pageSize: TODO_PAGE_SIZE,
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    todoInfiniteQueryOptions(isMeSelected ? user!.id : selectedMember.memberId, squadId, selectedDay, payload),
  );

  const todos = data ?? [];

  const [progressRate, setProgressRate] = useState(0);
  const todoCount = todos.length;

  const handlePrevMonth = () => {
    const prevMonth = subMonths(new Date(currentMonth), 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(new Date(currentMonth), 1);
    setCurrentMonth(nextMonth);
  };

  const loadMoreTodos = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    setCurrentSquadId(squadId);
  }, [squadId]);

  useEffect(() => {
    let isCompleted = 0;
    todos.forEach((todo) => todo.toDoStatus === TODO_STATUS.COMPLETED && isCompleted++);

    setProgressRate(!todoCount ? 0 : Math.floor((isCompleted / todoCount) * 100));
  }, [todos]);

  useEffect(
    () => () =>
      queryClient.removeQueries({
        queryKey: todoKeys.todos(squadId, selectedDay),
      }),
    [selectedDay, selectedMember],
  );

  return (
    <div css={containerStyle}>
      <section aria-labelledby="calendar">
        <h2 id="calendar" className="sr-only">
          캘린더
        </h2>
        <div css={monthNavButtonStyle}>
          <button onClick={handlePrevMonth}>{'<'}</button>
          <span>{format(currentMonth, 'yyyy년 MM월')}</span>
          <button onClick={handleNextMonth}>{'>'}</button>
        </div>
        <CalendarList selectedDay={selectedDay} onSelectDay={setSelectedDay} currentMonth={currentMonth} />
      </section>
      <section aria-labelledby="squad-members">
        <h2 id="squad-members" className="sr-only">
          멤버
        </h2>
        <SquadDetailMemberList squadMembers={squadDetail.squadMembers} />
      </section>
      <div css={headerStyle}>
        <span>{!selectedMember ? user?.name : selectedMember.name}</span>
        <span>달성률: {progressRate}%</span>
      </div>
      <TodoList todos={todos} loadMoreTodos={loadMoreTodos} isMeSelected={isMeSelected} />
      {isMeSelected && <TodoForm squadId={squadId} selectedDay={selectedDay} />}
    </div>
  );
};

export default SquadDetailPage;

const containerStyle = (them: Theme) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${them.colors.background.white};
`;

const monthNavButtonStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 28px;
    border: 2px solid ${theme.colors.gray.gray100};
    border-radius: 4px;
    ${theme.typography.size_14}
    font-weight: 500;
  }

  & button {
    width: 28px;
    height: 28px;
    border: 2px solid ${theme.colors.gray.gray100};
    border-radius: 4px;
    color: ${theme.colors.text};
    cursor: pointer;
    margin: 0 16px;

    transition: transform 0.3s ease-in-out;
    :hover {
      transform: scale(1.1);
      background-color: #eeeeee70;
    }
  }

  ${mobileMediaQuery(css`
    max-width: ${breakpoints.mobile};
    margin: 8px 36px;
  `)}

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
    margin: 8px 150px;
  `)}
`;

const headerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 24px 12px 32px;
  ${theme.typography.size_16}
`;
