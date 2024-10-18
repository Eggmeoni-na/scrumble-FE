import { Check, Delete, Edit } from '@/assets/icons';
import Button from '@/components/common/Button/Button';
import IconWrapper from '@/components/common/IconWrapper';
import { TODO_STATUS } from '@/constants/todo';
import { useUpdateTodoContents, useUpdateTodoStatus } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries/useTodo';
import { useSquadStore } from '@/stores/squad';
import { useToastStore } from '@/stores/toast';
import { useDayStore } from '@/stores/todo';
import { ToDoDetail, UpdateTodoRequest } from '@/types';
import { css, Theme, useTheme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { KeyboardEvent, MouseEvent, useState } from 'react';

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
  const { toDoAt, toDoId, contents, squadToDoId, toDoStatus } = todo;
  const [currentToDoStatus, setCurrentToDoStatus] = useState(todo.toDoStatus);
  const selectedDay = useDayStore((state) => state.selectedDay);
  const createToast = useToastStore((state) => state.createToast);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [newContents, setNewContents] = useState(contents);
  const isCompleted = currentToDoStatus === TODO_STATUS.COMPLETED;

  const queryClient = useQueryClient();
  const { updateTodoStatusMutate } = useUpdateTodoStatus(squadId, selectedDay, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.todos(squadId, selectedDay),
      });
    },
    onError: (error, data, context) => {
      if (context) {
        queryClient.setQueryData(todoKeys.todos(squadToDoId, selectedDay), context);
      }
    },
  });
  const { updateTodoContentsMutate } = useUpdateTodoContents({
    onSuccess: () => {
      createToast({
        type: 'success',
        message: '수정이 완료되었어요',
        duration: 2000,
        showCloseButton: false,
      });
      queryClient.refetchQueries({
        queryKey: todoKeys.todos(squadId, selectedDay),
      });
    },
    onError: () => {
      createToast({
        type: 'failed',
        message: '수정에 실패했어요',
        duration: 2000,
        showCloseButton: false,
      });
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

  const handleKeyPressForEdit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    if (!e.nativeEvent.isComposing) {
      e.preventDefault();
      document.getElementById('edit-btn')?.click();
    }
  };

  const handleEditContents = () => {
    const newTodo: UpdateTodoRequest = {
      toDoAt: selectedDay,
      toDoStatus,
      contents: newContents,
    };
    updateTodoContentsMutate({ toDoId, newTodo });
    setIsEditMode(false);
  };

  const handleDeleteTodo = () => {
    setIsDeleteMode(true);
    // TODO: Issue - 69 삭제 API 연동
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
        {!isEditMode ? (
          <p>{contents}</p>
        ) : (
          <input
            type="text"
            value={newContents}
            onChange={(e) => setNewContents(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyPressForEdit}
            autoFocus
            css={editInputStyle}
          />
        )}
      </div>
      {!isEditMode && (
        <div css={actionStyle} onClick={(e) => e.stopPropagation()}>
          <IconWrapper onClick={() => setIsEditMode(true)}>
            <Edit />
          </IconWrapper>
          <IconWrapper onClick={handleDeleteTodo}>
            <Delete />
          </IconWrapper>
        </div>
      )}
      {isEditMode && (
        <div css={editActionStyle} onClick={(e) => e.stopPropagation()}>
          <Button id="edit-btn" text="수정" variant="confirm" onClick={handleEditContents} />
          <Button text="취소" variant="default" onClick={() => setIsEditMode(false)} />
        </div>
      )}
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
  padding: 0 8px 0 12px;
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
  height: 100%;
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

const actionStyle = css`
  display: flex;
  gap: 4px;
  margin-right: 8px;

  & button {
    color: #bbbbbb;
  }
`;

const editInputStyle = (theme: Theme) => css`
  ${theme.typography.size_16}
  color: var(--color-text-gray);
  flex: 1;
  height: 100%;
`;

const editActionStyle = css`
  width: 122px;
  display: flex;
  gap: 4px;
  & button {
    border-radius: 12px;
  }
`;
