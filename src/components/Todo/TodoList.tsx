import { Check, Close, Delete, Edit } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { Button } from '@/components/common';
import { MemberTodoItem } from '@/components/Member';
import { TODO_STATUS } from '@/constants/todo';
import { useInfinite, useToastHandler } from '@/hooks';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries';
import { InfiniteQueryData } from '@/hooks/queries/types';
import { useDayStore, useSquadStore } from '@/stores';
import { ApiResponse, ToDoDetail, UpdateTodoRequest } from '@/types';
import handleKeyDown from '@/utils/handleKeyDown';
import { css, keyframes, Theme, useTheme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { KeyboardEvent, useState } from 'react';

type Props = {
  todos: ToDoDetail[];
  loadMoreTodos: VoidFunction;
  hasNextPage: boolean;
  isMeSelected: boolean;
};

export const TodoList = ({ todos, loadMoreTodos, hasNextPage, isMeSelected }: Props) => {
  const { loadMoreRef } = useInfinite(loadMoreTodos, hasNextPage);

  return (
    <ul css={[todoContainerStyle, !isMeSelected && memberTodoListStyle]}>
      {todos.map((todo) =>
        isMeSelected ? <TodoItem key={todo.toDoId} todo={todo} /> : <MemberTodoItem key={todo.toDoId} todo={todo} />,
      )}
      <br />
      <div ref={loadMoreRef} />
    </ul>
  );
};

const TodoItem = ({ todo }: { todo: ToDoDetail }) => {
  const squadId = useSquadStore((state) => state.currentSquadId);
  const theme = useTheme();
  const { toDoAt, toDoId, contents, toDoStatus } = todo;
  const [currentToDoStatus, setCurrentToDoStatus] = useState(todo.toDoStatus);
  const selectedDay = useDayStore((state) => state.selectedDay);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [newContents, setNewContents] = useState(contents);
  const isCompleted = currentToDoStatus === TODO_STATUS.COMPLETED;
  const { successToast, failedToast } = useToastHandler();

  const queryClient = useQueryClient();
  // TODO 상태 및 내용 수정 로직 공유
  const { updateTodoMutate } = useUpdateTodo(squadId, selectedDay, {
    onSuccess: ({ data }) => {
      successToast('수정에 성공했어요');
      queryClient.setQueryData(
        todoKeys.todos(squadId, selectedDay),
        (prevData: InfiniteQueryData<ApiResponse<ToDoDetail[]>>) => ({
          ...prevData,
          pages: prevData.pages.map((page) => ({
            ...page,
            data: page.data.map((todo) => (todo.toDoId === data.toDoId ? data : todo)),
          })),
        }),
      );
    },
    onError: (error, data, context) => {
      failedToast('수정에 실패했어요');
      if (context?.oldData) {
        queryClient.setQueryData(todoKeys.todos(squadId, selectedDay), context.oldData);
      }
    },
  });

  const { deleteTodoMuate } = useDeleteTodo(squadId, selectedDay, {
    onSuccess: () => successToast('삭제에 성공했어요'),
    onError: (error, data, context) => {
      failedToast('삭제에 실패했어요');
      if (context?.oldData) {
        queryClient.setQueryData(todoKeys.todos(squadId, selectedDay), context.oldData);
      }
    },
  });

  const toggleTodoStatus = () => {
    const newStatus = currentToDoStatus === TODO_STATUS.PENDING ? TODO_STATUS.COMPLETED : TODO_STATUS.PENDING;
    const newTodo: UpdateTodoRequest = {
      toDoAt,
      toDoStatus: newStatus,
      contents,
    };
    setCurrentToDoStatus(newStatus);
    updateTodoMutate({ toDoId, newTodo });
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
        <li
          css={[todoItemStyle(), getStatusStyles(isCompleted, theme)]}
          onClick={() => toggleTodoStatus()}
          onKeyDown={(e) => handleKeyDown(e, toggleTodoStatus)}
          tabIndex={0}
          role="button"
        >
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
            <div
              css={actionStyle}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="presentation"
            >
              <IconWrapper onClick={() => setIsEditMode(true)}>
                <Edit />
              </IconWrapper>
              <IconWrapper onClick={handleDeleteTodo}>
                <Delete />
              </IconWrapper>
            </div>
          )}
          {isEditMode && (
            <div
              css={editActionStyle}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="presentation"
            >
              <Button id="edit-btn" text="수정" variant="confirm" onClick={handleEditContents} />
              <Button text="취소" variant="default" onClick={() => setIsEditMode(false)} />
            </div>
          )}
        </li>
      ) : (
        <li
          css={todoItemStyle(isDeleteMode)}
          onClick={handleConfirmDelete}
          onKeyDown={(e) => handleKeyDown(e, handleConfirmDelete)}
          tabIndex={0}
          role="button"
        >
          <p>등록된 할일을 삭제할까요?</p>
          <IconWrapper style={{ marginRight: '8px' }}>
            <Close
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteMode(false);
              }}
            />
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
  background-color: ${isDeleteMode && '#ff5a5a'};
  color: ${isDeleteMode && 'white'};
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

  ${isDeleteMode &&
  css`
    animation: ${slideInFromRight} 0.3s ease-out;
  `}
`;

export const getStatusStyles = (isChecked: boolean, theme: Theme) => {
  switch (isChecked) {
    case true:
      return css`
        outline: 1.5px solid ${theme.colors.primary};
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
