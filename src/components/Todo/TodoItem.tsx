import { Check, Close, Delete, Edit } from '@/assets/icons';
import { Button } from '@/components/common';
import IconWrapper from '@/components/IconWrapper';
import { checkedStyle, checkIconStyle, contentStyle, getStatusStyles, todoItemStyle } from '@/components/Todo/TodoList';
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

  return (
    <>
      {!isDeleteMode ? (
        <li css={[todoItemStyle, getStatusStyles(isCompleted, theme)]}>
          <button onClick={toggleTodoStatus} style={fullSizeButtonStyle} aria-label="투두 상태 변경">
            <div css={contentStyle}>
              <IconWrapper
                aria-label={isCompleted ? '완료된 투두' : '완료되지 않은 투두'}
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
                  css={editInputStyle}
                  autoFocus
                />
              )}
            </div>
          </button>
          {!isEditMode ? (
            <div css={actionStyle} role="presentation">
              <IconWrapper onClick={() => setIsEditMode(true)} aria-label="투두 수정">
                <Edit />
              </IconWrapper>
              <IconWrapper onClick={handleDeleteTodo} aria-label="투두 삭제">
                <Delete />
              </IconWrapper>
            </div>
          ) : (
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
          )}
        </li>
      ) : (
        <li css={[todoItemStyle, deleteModeStyle]}>
          <Button
            onClick={handleConfirmDelete}
            text="삭제"
            style={fullSizeButtonStyle}
            css={deleteButtonStyle}
            aria-label="삭제"
          />
          <IconWrapper css={cancelButtonStyle} onClick={() => setIsDeleteMode(false)} aria-label="삭제 취소">
            <Close />
          </IconWrapper>
        </li>
      )}
    </>
  );
};

export default TodoItem;

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
    width: 24px;
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

  & button {
    border-radius: 12px;
    text-align: center;
    font-weight: 500;
  }
`;
