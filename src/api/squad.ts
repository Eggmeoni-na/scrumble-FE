import { instance } from '@/api';
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
