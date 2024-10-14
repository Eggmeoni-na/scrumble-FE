import { getTodoList } from '@/apis';
import { GetTodoRequest } from '@/types';
import { queryOptions } from '@tanstack/react-query';

export const todoKeys = {
  todos: (squadId: number) => [squadId, 'todoList'] as const,
};

export const todoQueryOptions = (params: GetTodoRequest) =>
  queryOptions({
    queryKey: todoKeys.todos(params.squadId),
    queryFn: () => getTodoList(params),
  });
