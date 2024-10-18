import { deleteTodo } from '@/apis';
import { DeleteTodoParamType, MutateOptionsType } from '@/hooks/mutations/types';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useDeleteTodo = (options: MutateOptionsType<ApiResponse<null>, DeleteTodoParamType>) => {
  const { mutate: deleteTodoMuate } = useMutation({
    mutationFn: deleteTodo,
    ...options,
  });

  return { deleteTodoMuate };
};

export default useDeleteTodo;
