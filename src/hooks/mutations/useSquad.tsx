import { createSquad, updateSquadName } from '@/apis';
import { ApiResponse, Squad, SquadDetail } from '@/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

/**
 * @type {T} - return value
 */
type MutateOptionsType<T, U, Context = unknown> = UseMutationOptions<T, Error, U, Context>;

export type createSquadParamType = { squadName: string };
export const useCreateSquadMutation = (options: MutateOptionsType<ApiResponse<Squad>, createSquadParamType>) =>
  useMutation({
    mutationFn: createSquad,
    ...options,
  });

export type updateSquadNameParamType = { squadId: number; squadName: string };
export const useUpdateSquadMutation = (
  options: MutateOptionsType<ApiResponse<SquadDetail>, updateSquadNameParamType, SquadDetail>,
) =>
  useMutation({
    mutationFn: updateSquadName,
    ...options,
  });
