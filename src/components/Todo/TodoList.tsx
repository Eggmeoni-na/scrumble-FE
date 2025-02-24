import { MemberTodoItem } from '@/components/Member';
import TodoItem from '@/components/Todo/TodoItem';
import { useInfinite } from '@/hooks';
import { ToDoDetail } from '@/types';
import { css, Theme } from '@emotion/react';

type Props = {
  todos: ToDoDetail[];
  loadMoreTodos: VoidFunction;
  hasNextPage: boolean;
  isMeSelected: boolean;
  squadMemberId: number;
};

export const TodoList = ({ todos, loadMoreTodos, hasNextPage, isMeSelected, squadMemberId }: Props) => {
  const { loadMoreRef } = useInfinite(loadMoreTodos, hasNextPage);

  return (
    <ul css={[todoContainerStyle, !isMeSelected && memberTodoListStyle]} aria-label="투두 리스트">
      {todos.map((todo) =>
        isMeSelected ? (
          <TodoItem key={todo.toDoId} todo={todo} squadMemberId={squadMemberId} />
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

export const todoContainerStyle = (theme: Theme) => css`
  background-color: ${theme.colors.background.gray};
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  margin: 0 16px;
  padding: 8px 0;
  border-radius: 24px;
  overflow-y: auto;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
`;

const memberTodoListStyle = css`
  margin-bottom: 24px;
`;
