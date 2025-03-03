import { Check, Close, Delete, Edit } from '@/assets/icons';
import { Button } from '@/components/common';
import IconWrapper from '@/components/IconWrapper';
import {
  actionStyle,
  cancelButtonStyle,
  checkedStyle,
  checkIconStyle,
  completedContentStyle,
  contentWrapperStyle,
  deleteButtonStyle,
  deleteModeStyle,
  editActionStyle,
  editInputStyle,
  getStatusStyles,
  todoItemStyle,
} from '@/components/Todo/styles';
import { TODO_STATUS } from '@/constants/todo';
import { useToastHandler } from '@/hooks';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries';
import { useDayStore, useSquadStore } from '@/stores';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { ToDoDetail, TodoQueryParams, UpdateTodoRequest } from '@/types';
import { useTheme } from '@emotion/react';
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

  const { deleteTodoMutate } = useDeleteTodo(queryParams, {
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
    deleteTodoMutate({ toDoId, squadId });
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
