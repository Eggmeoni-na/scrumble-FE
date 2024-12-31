import { deleteTodo } from '@/apis';
import { DeleteTodoParamType, MutateOptionsType } from '@/hooks/mutations/types';
import { todoKeys } from '@/hooks/queries';
import { InfiniteQueryData } from '@/hooks/queries/types';
import { ApiResponse, ToDoDetail, TodoQueryParams } from '@/types';
import { optimisticUpdateMutateHandler } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteTodo = (
  queryParams: TodoQueryParams,
  options: MutateOptionsType<
    ApiResponse<{ toDoId: number }>,
    DeleteTodoParamType,
    { oldData: InfiniteQueryData<ApiResponse<ToDoDetail[]>> | never[] | undefined }
  >,
) => {
  const queryClient = useQueryClient();
  const { mutate: deleteTodoMuate } = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (data) => {
      const { squadId, selectedDay, userId } = queryParams;
      const oldData = await optimisticUpdateMutateHandler<InfiniteQueryData<ApiResponse<ToDoDetail[]>>>(
        queryClient,
        todoKeys.todosByMember(squadId, selectedDay, userId),
        (prevData) => ({
          ...prevData,
          pages: prevData.pages.map((page) => ({
            ...page,
            data: page.data.filter((todo) => todo.toDoId !== data.toDoId),
          })),
        }),
      );
      return { oldData };
    },
    ...options,
  });

  return { deleteTodoMuate };
};

export default useDeleteTodo;
