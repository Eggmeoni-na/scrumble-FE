import {
  CreateSquadParamType,
  CreateTodoParamType,
  InviteMemberParamType,
  UpdateSquadNameParamType,
  UpdateTodoParamType,
} from '@/hooks/mutations';
import { ApiResponse, Squad, SquadDetail } from '@/types';
import { NotificationRequestPayload, NotificationResponse } from '@/types/notification';
import { MutationFunction } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const mockBaseUrl = '/mock-api';
const mockInstance = axios.create({
  baseURL: mockBaseUrl,
});

export const getTest = async () => {
  const response = await mockInstance.get('/post');
  return response;
};

export const getSquadApi = async (): Promise<{ data: Squad[] }> => {
  const response = await mockInstance.get('/squads');
  return response.data;
};

export const createSquadApi: MutationFunction<ApiResponse<Squad>, CreateSquadParamType> = async ({ squadName }) => {
  const response: AxiosResponse<ApiResponse<Squad>> = await mockInstance.post('/squads', { squadName });
  return response.data;
};

export const getSquadDetailApi = async (squadId: number): Promise<{ data: SquadDetail }> => {
  const response = await mockInstance.get(`/squads/${squadId}`);
  return response.data;
};

export const updateSquadNameApi: MutationFunction<ApiResponse<Squad>, UpdateSquadNameParamType> = async ({
  squadId,
  squadName,
}) => {
  const response = await mockInstance.put(`/squads/${squadId}`, { squadName });
  return response.data;
};

export const createTodoApi: MutationFunction<ApiResponse<{ toDoId: number }>, CreateTodoParamType> = async ({
  squadId,
  newTodo,
}) => {
  const response = await mockInstance.post(`/api/todos/squads/${squadId}`, newTodo);
  return response.data;
};

export const updateTodoApi: MutationFunction<ApiResponse<null>, UpdateTodoParamType> = async ({ toDoId, newTodo }) => {
  const response = await mockInstance.put(`/api/todos/${toDoId}`, newTodo);
  return response.data;
};

export const inviteMemberApi: MutationFunction<ApiResponse<null>, InviteMemberParamType> = async ({
  squadId,
  memberId,
}) => {
  const response = await mockInstance.post(`/api/squads/${squadId}/members/${memberId}`, {
    squadId,
    memberId,
  });
  return response.data;
};

export const getNotificationsApi = async (
  params: NotificationRequestPayload,
): Promise<{ data: NotificationResponse[] }> => {
  const response = await mockInstance.get(`/api/notifications/me`, { params });
  return response.data;
};
