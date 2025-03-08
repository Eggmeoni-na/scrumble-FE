import { TODO_STATUS } from '@/constants/todo';
import { useToastHandler } from '@/hooks';
import { useUpdateTodo } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries';
import { ToDoDetail, TodoQueryParams, UpdateTodoRequest } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, KeyboardEvent, SetStateAction, useCallback, useMemo, useState } from 'react';

export type TodoUpdateActionsReturnType = {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  newContents: string;
  setNewContents: Dispatch<SetStateAction<string>>;
  toggleTodoStatus: () => void;
  handleEditContents: () => void;
  handleKeyPressForEdit: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const useTodoUpdateActions = (todo: ToDoDetail, queryParams: TodoQueryParams) => {
  const { squadId, selectedDay, squadMemberId } = queryParams;
  const { toDoAt, toDoId, contents, toDoStatus } = todo;

  const [isEditMode, setIsEditMode] = useState(false);
  const [isToggleStatus, setIsToggleStatus] = useState(false);
  const [newContents, setNewContents] = useState(contents);

  const { successToast, failedToast } = useToastHandler();

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

  const toggleTodoStatus = useCallback(() => {
    const newStatus = toDoStatus === TODO_STATUS.PENDING ? TODO_STATUS.COMPLETED : TODO_STATUS.PENDING;
    const newTodo: UpdateTodoRequest = {
      toDoAt,
      toDoStatus: newStatus,
      contents,
    };
    setIsToggleStatus(true);
    updateTodoMutate({ toDoId, newTodo });
  }, [toDoId, toDoAt, toDoStatus, contents, updateTodoMutate]);

  const handleEditContents = useCallback(() => {
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
  }, [contents, newContents, selectedDay, toDoId, updateTodoMutate]);

  const handleKeyPressForEdit = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleEditContents();
    }
  }, []);

  const todoUpdateActions = useMemo(
    () => ({
      isEditMode,
      setIsEditMode,
      newContents,
      setNewContents,
      toggleTodoStatus,
      handleEditContents,
      handleKeyPressForEdit,
    }),
    [isEditMode, newContents, toggleTodoStatus, handleEditContents, handleKeyPressForEdit],
  );

  return todoUpdateActions;
};
