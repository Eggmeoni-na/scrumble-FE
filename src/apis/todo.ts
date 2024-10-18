import { instance } from '@/apis';
import { CreateTodoParamType, DeleteTodoParamType, UpdateTodoParamType } from '@/hooks/mutations';
import { ApiResponse, GetTodoRequest, ToDoDetail } from '@/types';
import { MutationFunction } from '@tanstack/react-query';

export const getTodoList = async (params: GetTodoRequest): Promise<{ data: ToDoDetail[] }> => {
  const { squadId, memberId, queryParams } = params;
  const response = await instance.get(`/api/todos/squads/${squadId}/members/${memberId}`, {
    params: queryParams,
  });
  return response.data;
};

export const createTodo: MutationFunction<ApiResponse<{ toDoId: number }>, CreateTodoParamType> = async ({
  squadId,
  newTodo,
}) => {
  const response = await instance.post(`/api/todos/squads/${squadId}`, newTodo);
  return response.data;
};

export const updateTodo: MutationFunction<ApiResponse<null>, UpdateTodoParamType> = async ({ toDoId, newTodo }) => {
  const response = await instance.put(`/api/todos/${toDoId}`, newTodo);
  return response.data;
};

export const deleteTodo: MutationFunction<ApiResponse<null>, DeleteTodoParamType> = async ({ toDoId, squadId }) => {
  const response = await instance.delete(`/api/todos/${toDoId}/squads/${squadId}`);
  return response.data;
};
