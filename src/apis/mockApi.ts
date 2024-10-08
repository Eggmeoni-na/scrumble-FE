import { createSquadParamType } from '@/hooks/mutations/useCreateSquad';
import { ApiResponse, Squad, SquadDetail } from '@/types';
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

export const createSquadApi: MutationFunction<ApiResponse<Squad>, createSquadParamType> = async ({ squadName }) => {
  const response: AxiosResponse<ApiResponse<Squad>> = await mockInstance.post('/squads', { squadName });
  return response.data;
};

export const getSquadDetailApi = async (id: number): Promise<{ data: SquadDetail }> => {
  const response = await mockInstance.get(`/squads/${id}`);
  return response.data;
};
