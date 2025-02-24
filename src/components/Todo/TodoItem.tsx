import { Check, Close, Delete, Edit } from '@/assets/icons';
import { Button } from '@/components/common';
import IconWrapper from '@/components/IconWrapper';
import { TODO_STATUS } from '@/constants/todo';
import { useToastHandler } from '@/hooks';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries';
import { useDayStore, useSquadStore } from '@/stores';
import { pcMediaQuery } from '@/styles/breakpoints';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { ToDoDetail, TodoQueryParams, UpdateTodoRequest } from '@/types';
import { css, keyframes, Theme, useTheme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { KeyboardEvent, useState } from 'react';

const TodoItem = ({ todo, squadMemberId }: { todo: ToDoDetail; squadMemberId: number }) => {
  const squadId = useSquadStore((state) => state.currentSquadId);
  const theme = useTheme();
  const { toDoAt, toDoId, contents, toDoStatus } = todo;
  const selectedDay = useDayStore((state) => state.selectedDay);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [newContents, setNewContents] = useState(contents);
  const [isToggleStatus, setIsToggleStatus] = useState(false);
  const isCompleted = toDoStatus === TODO_STATUS.COMPLETED;
  const { successToast, failedToast } = useToastHandler();

  const queryParams: TodoQueryParams = {
    squadId,
    selectedDay,
    squadMemberId,
  };

  const queryClient = useQueryClient();
  const { updateTodoMutate } = useUpdateTodo(queryParams, {
    onSuccess: () => {
      if (isToggleStatus) {
        setIsToggleStatus(false);
        return;
      }
      successToast('수정에 성공했어요');
    },
    onError: (error, data, context) => {
      failedToast('수정에 실패했어요');
      if (context?.oldData) {
        queryClient.setQueryData(todoKeys.todosByMember(squadId, selectedDay, squadMemberId), context.oldData);
      }
    },
  });

  const { deleteTodoMuate } = useDeleteTodo(queryParams, {
    onSuccess: () => successToast('삭제에 성공했어요'),
    onError: (error, data, context) => {
      failedToast('삭제에 실패했어요');
      if (context?.oldData) {
        queryClient.setQueryData(todoKeys.todosByMember(squadId, selectedDay, squadMemberId), context.oldData);
      }
    },
  });

  const toggleTodoStatus = () => {
    const newStatus = toDoStatus === TODO_STATUS.PENDING ? TODO_STATUS.COMPLETED : TODO_STATUS.PENDING;
    const newTodo: UpdateTodoRequest = {
      toDoAt,
      toDoStatus: newStatus,
      contents,
    };
    setIsToggleStatus(true);
    updateTodoMutate({ toDoId, newTodo });
  };

  const handleKeyPressForEdit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleEditContents();
    }
  };

  const handleEditContents = () => {
    if (contents === newContents) {
      setIsEditMode(false);
      return;
    }
    const newTodo: UpdateTodoRequest = {
      toDoAt: selectedDay,
      toDoStatus,
      contents: newContents,
    };
    updateTodoMutate({ toDoId, newTodo });
    setIsEditMode(false);
  };

  const handleDeleteTodo = () => setIsDeleteMode(true);

  const handleConfirmDelete = () => {
    deleteTodoMuate({ toDoId, squadId });
    setIsDeleteMode(false);
  };

  if (isDeleteMode) {
    return (
      <li css={[todoItemStyle, deleteModeStyle]}>
        <Button onClick={handleConfirmDelete} text="삭제" css={deleteButtonStyle} aria-label="삭제" />
        <IconWrapper css={cancelButtonStyle} onClick={() => setIsDeleteMode(false)} aria-label="삭제 취소">
          <Close />
        </IconWrapper>
      </li>
    );
  }

  const renderTodoContent = () => (
    <div css={contentWrapperStyle}>
      <IconWrapper
        aria-label={isCompleted ? '완료된 투두' : '완료되지 않은 투두'}
        aria-checked={isCompleted}
        role="checkbox"
        css={[checkIconStyle, isCompleted && checkedStyle]}
      >
        {isCompleted && <Check />}
      </IconWrapper>
      {isEditMode ? (
        <input
          type="text"
          value={newContents}
          onChange={(e) => setNewContents(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyPressForEdit}
          css={editInputStyle}
          autoFocus
        />
      ) : (
        <p id={`todo-${todo.toDoId}`} css={isCompleted && completedContentStyle} style={{ textAlign: 'left' }}>
          {contents}
        </p>
      )}
    </div>
  );

  const renderDefaultActions = () => (
    <div css={actionStyle} role="presentation">
      <IconWrapper onClick={() => setIsEditMode(true)} aria-label="투두 수정">
        <Edit />
      </IconWrapper>
      <IconWrapper onClick={handleDeleteTodo} aria-label="투두 삭제">
        <Delete />
      </IconWrapper>
    </div>
  );

  const renderEditActions = () => (
    <div css={editActionStyle} role="presentation">
      <Button id="edit-btn" text="수정" variant="confirm" onClick={handleEditContents} aria-label="수정하기" />
      <Button
        text="취소"
        variant="default"
        onClick={() => {
          setNewContents(contents);
          setIsEditMode(false);
        }}
        aria-label="투두 수정 취소"
      />
    </div>
  );

  return (
    <li css={[todoItemStyle, getStatusStyles(isCompleted, theme)]} aria-labelledby={`todo-${todo.toDoId}`}>
      <button onClick={toggleTodoStatus} css={fullSizeButtonStyle} aria-label="투두 상태 변경">
        {renderTodoContent()}
      </button>
      {isEditMode ? renderEditActions() : renderDefaultActions()}
    </li>
  );
};

export default TodoItem;

export const todoItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  margin: 0 8px;
  padding: 8px 0 8px 8px;
  min-height: 48px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease-out;

  & button,
  div {
    font-size: 0.8rem;
  }

  ${pcMediaQuery(css`
    & button,
    div {
      font-size: 1rem;
    }
  `)}
`;

export const contentWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
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

export const getStatusStyles = (isChecked: boolean, theme: Theme) => {
  switch (isChecked) {
    case true:
      return css`
        outline: 1.5px solid ${theme.colors.primary};
        background-color: ${theme.colors.background.lightYellow};
      `;
    default:
      return css`
        background-color: ${theme.colors.background.white};
      `;
  }
};

const completedContentStyle = (theme: Theme) => css`
  color: ${theme.colors.gray.gray200};
  text-decoration: line-through ${theme.colors.gray.gray200};
  text-decoration-thickness: 1.5px;
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const deleteModeStyle = css`
  animation: ${slideInFromRight} 0.3s ease-out;

  & button {
    font-weight: 500;
    text-align: center;
    border-radius: 12px;
    color: white;
  }
`;

const deleteButtonStyle = css`
  background-color: #ff5a5a;
`;

const cancelButtonStyle = css`
  width: 56px;
  height: 100%;
  background-color: #dfdfdf;
  border-radius: 8px;
  margin-right: 8px;

  & svg {
    width: 20px;
    color: var(--color-text-gray);
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
  height: 100%;
  flex: 1;
  font-size: 0.8rem;
  color: var(--color-text-gray);

  ${pcMediaQuery(css`
    ${theme.typography.size_16}
  `)}
`;

const editActionStyle = css`
  width: 132px;
  display: flex;
  gap: 4px;
  margin-right: 8px;
  text-decoration: none;

  & button {
    border-radius: 12px;
    text-align: center;
    font-weight: 500;
  }
`;
