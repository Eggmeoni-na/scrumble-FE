import { createSquadParamType, updateSquadNameParamType } from '@/hooks/mutations/useSquad';
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

export const getSquadDetailApi = async (squadId: number): Promise<{ data: SquadDetail }> => {
  const response = await mockInstance.get(`/squads/${squadId}`);
  return response.data;
};

export const updateSquadNameApi: MutationFunction<ApiResponse<Squad>, updateSquadNameParamType> = async ({
  squadId,
  squadName,
}) => {
  const response = await mockInstance.put(`/squads/${squadId}`, { squadName });
  return response.data;
};
