import { updateTodo } from '@/apis';
import { MutateOptionsType, UpdateTodoParamType } from '@/hooks/mutations/types';
import { InfiniteQueryData } from '@/hooks/queries/types';
import { todoKeys } from '@/hooks/queries/useTodo';
import { ApiResponse, CreateAndUpdateResponseType, ToDoDetail } from '@/types';
import { optimisticUpdateMutateHandler } from '@/utils/optimisticUpdateMutateHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTodo = (
  squadId: number,
  selectedDay: string,
  options: MutateOptionsType<ApiResponse<CreateAndUpdateResponseType>, UpdateTodoParamType>,
) => {
  const queryClient = useQueryClient();
  const { mutate: updateTodoMutate } = useMutation({
    mutationFn: updateTodo,
    onMutate: () =>
      optimisticUpdateMutateHandler<InfiniteQueryData<ApiResponse<ToDoDetail[]>>>(
        queryClient,
        todoKeys.todos(squadId, selectedDay),
      ),
    ...options,
  });
  return { updateTodoMutate };
};
