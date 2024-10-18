import { updateTodo } from '@/apis';
import { MutateOptionsType, UpdateTodoParamType } from '@/hooks/mutations/types';
import { todoKeys } from '@/hooks/queries/useTodo';
import { ApiResponse, ToDoDetail } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTodoStatus = (
  squadId: number,
  selectedDay: string,
  options: MutateOptionsType<ApiResponse<null>, UpdateTodoParamType>,
) => {
  const queryClient = useQueryClient();
  const { mutate: updateTodoStatusMutate } = useMutation({
    mutationFn: updateTodo,
    onMutate: async (data) => {
      try {
        await queryClient.cancelQueries({
          queryKey: todoKeys.todos(squadId, selectedDay),
        });

        const oldData = queryClient.getQueryData<ToDoDetail[]>(todoKeys.todos(squadId, selectedDay)) ?? [];
        queryClient.setQueryData(
          todoKeys.todos(squadId, selectedDay),
          (prevData: ApiResponse<ToDoDetail[]> | undefined) =>
            prevData && {
              ...prevData,
              data: prevData.data.map((todo) => (todo.toDoId === data.toDoId ? { ...todo, ...data.newTodo } : todo)),
            },
        );
        return oldData;
      } catch (error) {
        console.error('Optimistic Update Error:', error);
      }
    },
    ...options,
  });
  return { updateTodoStatusMutate };
};

export const useUpdateTodoContents = (options: MutateOptionsType<ApiResponse<null>, UpdateTodoParamType>) => {
  const { mutate: updateTodoContentsMutate } = useMutation({
    mutationFn: updateTodo,
    ...options,
  });
  return { updateTodoContentsMutate };
};
