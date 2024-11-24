import { deleteTodo } from '@/apis';
import { DeleteTodoParamType, MutateOptionsType } from '@/hooks/mutations/types';
import { InfiniteQueryData } from '@/hooks/queries/types';
import { todoKeys } from '@/hooks/queries/useTodo';
import { ApiResponse, ToDoDetail } from '@/types';
import { optimisticUpdateMutateHandler } from '@/utils/optimisticUpdateMutateHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteTodo = (
  squadId: number,
  selectedDay: string,
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
      const oldData = await optimisticUpdateMutateHandler<InfiniteQueryData<ApiResponse<ToDoDetail[]>>>(
        queryClient,
        todoKeys.todos(squadId, selectedDay),
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
