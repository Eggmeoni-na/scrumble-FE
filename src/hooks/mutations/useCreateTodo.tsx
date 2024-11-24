import { createTodo } from '@/apis';
import { CreateTodoParamType, MutateOptionsType } from '@/hooks/mutations/types';
import { ApiResponse, CreateAndUpdateResponseType } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useCreateTodo = (options: MutateOptionsType<ApiResponse<CreateAndUpdateResponseType>, CreateTodoParamType>) => {
  const { mutate: createTodoMutate } = useMutation({
    mutationFn: createTodo,
    ...options,
  });
  return { createTodoMutate };
};

export default useCreateTodo;
