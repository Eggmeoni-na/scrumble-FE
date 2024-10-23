import { getTodoList } from '@/apis';
import { GetTodoRequestParams, GetTodoRequestPayload } from '@/types';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export const todoKeys = {
  todos: (squadId: number, day: string) => ['todoList', squadId, day] as const,
  todoById: (squadId: number, day: string, todoId: number) => [...todoKeys.todos(squadId, day), todoId] as const,
  todosByMember: (squadId: number, day: string, memberId: number) => [...todoKeys.todos(squadId, day), memberId],
};

export const todoQueryOptions = (selectedDay: string, params: GetTodoRequestParams) =>
  queryOptions({
    queryKey: todoKeys.todos(params.squadId, selectedDay),
    queryFn: () => getTodoList(params),
  });

export const todoInfiniteQueryOptions = (
  memberId: number,
  squadId: number,
  selectedDay: string,
  queryParams: Omit<GetTodoRequestPayload, 'lastToDoId'>,
) =>
  infiniteQueryOptions({
    queryKey: todoKeys.todos(squadId, selectedDay),
    queryFn: ({ pageParam }) =>
      getTodoList({
        squadId,
        memberId,
        queryParams: {
          ...queryParams,
          lastToDoId: pageParam,
        },
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data || lastPage.data.length === 0) {
        return null;
      }
      const lastToDoId = lastPage?.data[lastPage.data.length - 1].toDoId ?? null;
      return lastToDoId;
    },
    initialPageParam: 1,
    select: (data) => (data.pages ?? []).flatMap((page) => page.data),
    refetchOnWindowFocus: false,
  });
