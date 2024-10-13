import { getMyTodoList } from '@/apis/mockApi';
import { queryOptions } from '@tanstack/react-query';

export const todoKeys = {
  todos: ['todoList'] as const,
  todoDetail: (todoId: number) => [todoKeys.todos, todoId] as const,
};

export const todoQueryOptions = (squadId: number, memberId: number) =>
  queryOptions({
    queryKey: todoKeys.todos,
    queryFn: () => getMyTodoList(squadId, memberId),
  });
