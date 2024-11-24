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
  options: MutateOptionsType<
    ApiResponse<CreateAndUpdateResponseType>,
    UpdateTodoParamType,
    { oldData: InfiniteQueryData<ApiResponse<ToDoDetail[]>> | never[] | undefined }
  >,
) => {
  const queryClient = useQueryClient();
  const { mutate: updateTodoMutate } = useMutation({
    mutationFn: updateTodo,
    onMutate: async () => {
      const oldData = await optimisticUpdateMutateHandler<InfiniteQueryData<ApiResponse<ToDoDetail[]>>>(
        queryClient,
        todoKeys.todos(squadId, selectedDay),
      );

      return { oldData };
    },
    ...options,
  });
  return { updateTodoMutate };
};
