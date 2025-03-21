import { MemberTodoItem } from '@/components/Member';
import { TodoItem } from '@/components/Todo';
import { memberTodoListStyle, todoContainerStyle } from '@/components/Todo/styles';
import { TODO_PAGE_SIZE, TODO_STATUS } from '@/constants/todo';
import { useInfinite } from '@/hooks';
import { todoInfiniteQueryOptions } from '@/hooks/queries';
import { TodoQueryParams } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  isMeSelected: boolean;
  onChangeProgressRate: Dispatch<SetStateAction<number>>;
  queryParams: TodoQueryParams;
};

const List = ({ isMeSelected, onChangeProgressRate, queryParams }: Props) => {
  const { squadId, squadMemberId, selectedDay } = queryParams;

  const payload = {
    startDate: selectedDay,
    endDate: selectedDay,
    pageSize: TODO_PAGE_SIZE,
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    todoInfiniteQueryOptions(squadMemberId, squadId, selectedDay, payload),
  );

  const todos = data ?? [];

  const loadMoreTodos = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const { loadMoreRef } = useInfinite(loadMoreTodos, hasNextPage);

  useEffect(() => {
    const isCompleted = todos.filter((todo) => todo.toDoStatus === TODO_STATUS.COMPLETED).length;
    const newProgressRate = !todos.length ? 0 : Math.floor((isCompleted / todos.length) * 100);

    onChangeProgressRate(newProgressRate);
  }, [todos]);

  return (
    <ul css={[todoContainerStyle, !isMeSelected && memberTodoListStyle]} aria-label="투두 리스트">
      {todos.map((todo) =>
        isMeSelected ? (
          <TodoItem key={todo.toDoId} todo={todo} queryParams={queryParams} />
        ) : (
          <MemberTodoItem key={todo.toDoId} todo={todo} />
        ),
      )}
      {todos.length > 0 && (
        <>
          <br />
          <div ref={loadMoreRef} />
        </>
      )}
    </ul>
  );
};

export default List;
