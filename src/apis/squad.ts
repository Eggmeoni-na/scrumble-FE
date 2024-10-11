import { instance } from '@/apis';
import { CreateSquadParamType, DeleteSquadNameParamType, UpdateSquadNameParamType } from '@/hooks/mutations';

import { ApiResponse, Squad, SquadDetail } from '@/types';
import { MutationFunction } from '@tanstack/react-query';

export const getSquadList = async (): Promise<{ data: Squad[] }> => {
  const response = await instance.get('/api/squads');
  return response.data;
};

export const createSquad: MutationFunction<ApiResponse<Squad>, CreateSquadParamType> = async ({
  squadName,
}): Promise<ApiResponse<Squad>> => {
  const response = await instance.post('/api/squads', { squadName });
  return response.data;
};

export const getSquadDetail = async (squadId: number): Promise<{ data: SquadDetail }> => {
  const response = await instance.get(`/api/squads/${squadId}`);
  return response.data;
};

export const updateSquadName: MutationFunction<ApiResponse<SquadDetail>, UpdateSquadNameParamType> = async ({
  squadId,
  squadName,
}): Promise<ApiResponse<SquadDetail>> => {
  const response = await instance.put(`/api/squads/${squadId}`, { squadName });
  return response.data;
};

export const deleteSquad: MutationFunction<ApiResponse<null>, DeleteSquadNameParamType> = async ({
  squadId,
}): Promise<ApiResponse<null>> => {
  const response = await instance.delete(`/api/squads/${squadId}`);
  return response.data;
};
