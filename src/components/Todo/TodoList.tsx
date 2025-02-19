import { MemberTodoItem } from '@/components/Member';
import TodoItem from '@/components/Todo/TodoItem';
import { useInfinite } from '@/hooks';
import { pcMediaQuery } from '@/styles/breakpoints';
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
    <ul css={[todoContainerStyle, !isMeSelected && memberTodoListStyle]}>
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

export const todoItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  margin: 0 8px;
  padding: 4px 0 4px 8px;
  min-height: 48px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease-out;

  & button {
    font-size: 0.8rem;
    text-align: left;
  }

  ${pcMediaQuery(css`
    & button {
      font-size: 1rem;
    }
  `)}
`;

export const getStatusStyles = (isChecked: boolean, theme: Theme) => {
  switch (isChecked) {
    case true:
      return css`
        outline: 1.5px solid ${theme.colors.primary};
        background-color: ${theme.colors.background.lightYellow};
        text-decoration: line-through ${theme.colors.gray.gray200};
        text-decoration-thickness: 1.5px;

        & button,
        div {
          color: ${theme.colors.gray.gray200};
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.background.white};
      `;
  }
};

export const contentStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;

  & p {
    max-width: 140px;
  }

  ${pcMediaQuery(css`
    & p {
      max-width: unset;
    }
  `)}
`;

export const checkIconStyle = (theme: Theme) => css`
  min-width: 20px;
  max-width: 20px;
  height: 20px;
  background-color: ${theme.colors.background.white};
  border: 2px solid ${theme.colors.gray.gray100};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const checkedStyle = (theme: Theme) => css`
  background-color: ${theme.colors.primary};
  border: none;

  & svg {
    color: white;
    stroke-width: 2;
    width: 12px;
    height: 12px;
  }
`;
