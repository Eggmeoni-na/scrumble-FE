import { updateTodo } from '@/apis';
import { MutateOptionsType, UpdateTodoParamType } from '@/hooks/mutations/types';
import { todoKeys } from '@/hooks/queries';
import { InfiniteQueryData } from '@/hooks/queries/types';
import { ApiResponse, CreateAndUpdateResponseType, ToDoDetail } from '@/types';
import { optimisticUpdateMutateHandler } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTodo = (
  toDoId: number,
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
    onMutate: async ({ newTodo }) => {
      const oldData = await optimisticUpdateMutateHandler<InfiniteQueryData<ApiResponse<ToDoDetail[]>>>(
        queryClient,
        todoKeys.todos(squadId, selectedDay),
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
