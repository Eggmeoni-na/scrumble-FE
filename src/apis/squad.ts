import { instance } from '@/apis';
import { createSquadParamType } from '@/hooks/useMutations';
import { ApiResponse, Squad } from '@/types';
import { MutationFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getSquadList = async (): Promise<{ data: Squad[] }> => {
  const response = await instance.get('/api/squads');
  return response.data;
};

export const createSquad: MutationFunction<ApiResponse<Squad>, createSquadParamType> = async ({ squadName }) => {
  const response: AxiosResponse<ApiResponse<Squad>> = await instance.post('/api/squads', { squadName });
  return response.data;
};

export const getSquadDetail = async (squadId: number): Promise<{ data: Squad }> => {
  const response = await instance.get(`/api/squads/${squadId}`);
  return response.data;
};
