import { getTodoList } from '@/apis';
import { GetTodoRequest } from '@/types';
import { queryOptions } from '@tanstack/react-query';

export const todoKeys = {
  todos: (squadId: number, day: string) => [squadId, 'todoList', day] as const,
};

export const todoQueryOptions = (selectedDay: string, params: GetTodoRequest) =>
  queryOptions({
    queryKey: todoKeys.todos(params.squadId, selectedDay),
    queryFn: () => getTodoList(params),
  });
