import { Check, Close, Delete, Edit } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { Button } from '@/components/common';
import { MemberTodoItem } from '@/components/Member';
import { TODO_STATUS } from '@/constants/todo';
import { useInfinite, useToastHandler } from '@/hooks';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries';
import { useDayStore, useSquadStore } from '@/stores';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { ToDoDetail, TodoQueryParams, UpdateTodoRequest } from '@/types';
import { css, keyframes, Theme, useTheme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { KeyboardEvent, useState } from 'react';

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
        <li css={[todoItemStyle(), getStatusStyles(isCompleted, theme)]}>
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
        <li css={[todoItemStyle(), deleteModeStyle]}>
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

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const todoItemStyle = (isDeleteMode?: boolean) => css`
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
  transition: transform 0.3s ease-out;

  & button {
    font-size: 1rem;
  }
`;

const deleteModeStyle = css`
  animation: ${slideInFromRight} 0.3s ease-out;

  & button {
    border-radius: 16px;
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
  flex: 1;
  gap: 8px;
  height: 100%;
`;

export const checkIconStyle = (theme: Theme) => css`
  width: 20px;
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
