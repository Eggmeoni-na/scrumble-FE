import { updateTodo } from '@/apis';
import { MutateOptionsType, UpdateTodoParamType } from '@/hooks/mutations/types';
import { todoKeys } from '@/hooks/queries';
import { InfiniteQueryData } from '@/hooks/queries/types';
import { ApiResponse, CreateAndUpdateResponseType, ToDoDetail, TodoQueryParams } from '@/types';
import { optimisticUpdateMutateHandler } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTodo = (
  queryParams: TodoQueryParams,
  options: MutateOptionsType<
    ApiResponse<CreateAndUpdateResponseType>,
    UpdateTodoParamType,
    { oldData: InfiniteQueryData<ApiResponse<ToDoDetail[]>> | never[] | undefined }
  >,
) => {
  const queryClient = useQueryClient();
  const { mutate: updateTodoMutate } = useMutation({
    mutationFn: updateTodo,
    onMutate: async ({ newTodo, toDoId }) => {
      const { squadId, selectedDay, userId } = queryParams;
      const oldData = await optimisticUpdateMutateHandler<InfiniteQueryData<ApiResponse<ToDoDetail[]>>>(
        queryClient,
        todoKeys.todosByMember(squadId, selectedDay, userId),
        (prevData: InfiniteQueryData<ApiResponse<ToDoDetail[]>>) => {
          const todo = {
            ...newTodo,
            toDoId,
          };

          return {
            ...prevData,
            pages: prevData.pages.map((page) => ({
              ...page,
              data: page.data.map((prevTodo) => (prevTodo.toDoId === toDoId ? todo : prevTodo)),
            })),
          };
        },
      );

      return { oldData };
    },
    ...options,
  });
  return { updateTodoMutate };
};
