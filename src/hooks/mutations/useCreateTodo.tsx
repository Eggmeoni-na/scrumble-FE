import { createTodo } from '@/apis';
import { CreateTodoParamType, MutateOptionsType } from '@/hooks/mutations/types';
import { todoKeys } from '@/hooks/queries/useTodo';
import { ApiResponse, CreateAndUpdateResponseType } from '@/types';
import { optimisticUpdateMutateHandler } from '@/utils/optimisticUpdateMutateHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateTodo = (
  squadId: number,
  selectedDay: string,
  options: MutateOptionsType<ApiResponse<CreateAndUpdateResponseType>, CreateTodoParamType>,
) => {
  const queryClient = useQueryClient();
  const { mutate: createTodoMutate } = useMutation({
    mutationFn: createTodo,
    onMutate: () => optimisticUpdateMutateHandler(queryClient, todoKeys.todos(squadId, selectedDay)),
    ...options,
  });
  return { createTodoMutate };
};

export default useCreateTodo;
