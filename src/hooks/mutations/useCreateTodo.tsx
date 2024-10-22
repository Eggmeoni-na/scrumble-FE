import { createTodo } from '@/apis';
import { CreateTodoParamType, MutateOptionsType } from '@/hooks/mutations/types';
import { todoKeys } from '@/hooks/queries/useTodo';
import { ApiResponse, CreateAndUpdateResponseType, ToDoDetail } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateTodo = (
  squadId: number,
  selectedDay: string,
  options: MutateOptionsType<ApiResponse<CreateAndUpdateResponseType>, CreateTodoParamType>,
) => {
  const queryClient = useQueryClient();
  const { mutate: createTodoMutate } = useMutation({
    mutationFn: createTodo,
    onMutate: async () => {
      try {
        await queryClient.cancelQueries({
          queryKey: todoKeys.todos(squadId, selectedDay),
        });

        const oldData = queryClient.getQueryData<ToDoDetail[]>(todoKeys.todos(squadId, selectedDay)) ?? [];

        return oldData;
      } catch (error) {
        console.error('Optimistic Update Error:', error);
      }
    },
    ...options,
  });
  return { createTodoMutate };
};

export default useCreateTodo;
