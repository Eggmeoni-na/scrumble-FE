import { instance } from '@/apis';

import { createSquadParamType, updateSquadNameParamType } from '@/hooks/mutations/useSquad';
import { ApiResponse, Squad, SquadDetail } from '@/types';
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

export const getSquadDetail = async (squadId: number): Promise<{ data: SquadDetail }> => {
  const response = await instance.get(`/api/squads/${squadId}`);
  return response.data;
};

export const updateSquadName: MutationFunction<ApiResponse<SquadDetail>, updateSquadNameParamType> = async ({
  squadId,
  squadName,
}) => {
  const response: AxiosResponse<ApiResponse<SquadDetail>> = await instance.put(`/api/squads/${squadId}`, { squadName });
  return response.data;
};
