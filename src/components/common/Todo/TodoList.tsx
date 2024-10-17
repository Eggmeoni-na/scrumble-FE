import { Check, More } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { TODO_STATUS } from '@/constants/todo';
import { useUpdateTodoStatus } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries/useTodo';
import { useSquadStore } from '@/stores/squad';
import { useDayStore } from '@/stores/todo';
import { ToDoDetail, UpdateTodoRequest } from '@/types';
import { css, Theme, useTheme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useState } from 'react';

type Props = {
  todos: ToDoDetail[];
};

const TodoList = ({ todos }: Props) => {
  return (
    <ul css={todoContainerStyle}>
      {todos.map((todo) => (
        <TodoItem key={todo.toDoId} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;

const TodoItem = ({ todo }: { todo: ToDoDetail }) => {
  const squadId = useSquadStore((state) => state.currentSquadId);
  const theme = useTheme();
  const { toDoAt, toDoId, contents, squadToDoId } = todo;
  const [currentToDoStatus, setCurrentToDoStatus] = useState(todo.toDoStatus);
  const selectedDay = useDayStore((state) => state.selectedDay);
  const isCompleted = currentToDoStatus === TODO_STATUS.COMPLETED;

  const queryClient = useQueryClient();
  const { updateTodoStatusMutate } = useUpdateTodoStatus(squadId, selectedDay, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.todos(squadToDoId, selectedDay),
      });
    },
    onError: (error, data, context) => {
      if (context) {
        queryClient.setQueryData(todoKeys.todos(squadToDoId, selectedDay), context);
      }
    },
  });

  const toggleTodoStatus = (e: MouseEvent<HTMLLIElement>) => {
    const newStatus = currentToDoStatus === TODO_STATUS.PENDING ? TODO_STATUS.COMPLETED : TODO_STATUS.PENDING;
    const newTodo: UpdateTodoRequest = {
      toDoAt,
      toDoStatus: newStatus,
      contents,
    };
    setCurrentToDoStatus(newStatus);
    updateTodoStatusMutate({ toDoId, newTodo });
  };

  return (
    <li css={[todoItemStyle, getStatusStyles(isCompleted, theme)]} onClick={(e) => toggleTodoStatus(e)}>
      <div css={contentStyle}>
        <IconWrapper
          aria-label={isCompleted ? 'Completed todo' : 'Uncompleted todo'}
          aria-checked={isCompleted}
          role="checkbox"
          css={[checkIconStyle, isCompleted && checkedStyle]}
        >
          {isCompleted && <Check />}
        </IconWrapper>
        <p>{contents}</p>
      </div>
      <div>
        <IconWrapper style={{ color: `${theme.colors.gray.gray200}` }}>
          <More />
        </IconWrapper>
      </div>
    </li>
  );
};

const todoContainerStyle = (theme: Theme) => css`
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

const todoItemStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  margin: 0 8px;
  padding: 0 4px 0 12px;
  height: 48px;
  flex-shrink: 0;
  cursor: pointer;
`;

const getStatusStyles = (isChecked: boolean, theme: Theme) => {
  switch (isChecked) {
    case true:
      return css`
        border: 1px solid ${theme.colors.primary};
        background-color: ${theme.colors.background.lightYellow};
        color: var(--color-primary);
      `;
    default:
      return css`
        background-color: ${theme.colors.background.white};
        color: var(--color-text-gray);
      `;
  }
};

const contentStyle = css`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
`;

const checkIconStyle = (theme: Theme) => css`
  width: 20px;
  height: 20px;
  background-color: ${theme.colors.background.white};
  border: 2px solid ${theme.colors.gray.gray100};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const checkedStyle = (theme: Theme) => css`
  background-color: ${theme.colors.primary};
  border: none;

  & svg {
    color: white;
    width: 12px;
    height: 12px;
  }
`;
