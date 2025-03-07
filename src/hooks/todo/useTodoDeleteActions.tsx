import { useToastHandler } from '@/hooks';
import { useDeleteTodo } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries';
import { TodoQueryParams } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

export const useTodoDeleteActions = (toDoId: number, queryParams: TodoQueryParams) => {
  const { squadId, selectedDay, squadMemberId } = queryParams;
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { successToast, failedToast } = useToastHandler();

  const queryClient = useQueryClient();
  const { deleteTodoMutate } = useDeleteTodo(queryParams, {
    onSuccess: () => successToast('삭제에 성공했어요'),
    onError: (error, data, context) => {
      failedToast('삭제에 실패했어요');
      if (context?.oldData) {
        queryClient.setQueryData(todoKeys.todosByMember(squadId, selectedDay, squadMemberId), context.oldData);
      }
    },
  });

  const toggleDeleteMode = useCallback(() => setIsDeleteMode((prev) => !prev), []);

  const handleConfirmDelete = useCallback(() => {
    deleteTodoMutate(
      { toDoId, squadId },
      {
        onSettled: () => setIsDeleteMode(false),
      },
    );
  }, []);

  return {
    isDeleteMode,
    toggleDeleteMode,
    handleConfirmDelete,
  };
};
