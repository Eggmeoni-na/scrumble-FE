import { Check, More } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { TODO_STATUS } from '@/constants/todo';
import { useTodoStore } from '@/stores/todo';
import { ToDoDetail } from '@/types';
import { css, Theme, useTheme } from '@emotion/react';
import { isEqual } from 'es-toolkit';
import { useState } from 'react';

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
  const theme = useTheme();
  const [currentTodoState, setCurrentState] = useState(todo);
  const setIsTodoChanged = useTodoStore((state) => state.setIsTodoChanged);
  const isCompleted = currentTodoState.todoStatus === TODO_STATUS.COMPLETED;

  const toggleTodoStatus = () => {
    const updatedTodo: ToDoDetail = {
      ...todo,
      todoStatus: isCompleted ? TODO_STATUS.PENDING : TODO_STATUS.COMPLETED,
    };
    setCurrentState(updatedTodo);
    setIsTodoChanged(!isEqual(todo, updatedTodo));
  };

  return (
    <li css={[todoItemStyle, getStatusStyles(isCompleted, theme)]} onClick={toggleTodoStatus}>
      <div css={contentStyle}>
        <IconWrapper
          aria-label={isCompleted ? 'Selected member' : 'Unselected member'}
          aria-checked={isCompleted}
          role="checkbox"
          css={[checkIconStyle, isCompleted && checkedStyle]}
        >
          {isCompleted && <Check />}
        </IconWrapper>
        <p>{todo.contents}</p>
      </div>
      <IconWrapper style={{ color: `${theme.colors.gray.gray200}` }}>
        <More />
      </IconWrapper>
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
