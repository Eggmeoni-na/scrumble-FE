import { instance } from '@/apis';
import { GetTodoRequest, ToDoDetail } from '@/types';

export const getTodoList = async (params: GetTodoRequest): Promise<{ data: ToDoDetail[] }> => {
  const { squadId, memberId, queryParams } = params;
  const response = await instance.get(`/api/todos/squads/${squadId}/members/${memberId}`, {
    params: queryParams,
  });
  return response.data;
};
