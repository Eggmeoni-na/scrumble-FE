import { createSquad } from '@/apis';
import { ApiResponse, Squad } from '@/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

/**
 * @type {T} - return value
 */
type MutateOptionsType<T, U> = UseMutationOptions<T, Error, U>;

export type createSquadParamType = { squadName: string };
export const useCreateSquadMutation = (options: MutateOptionsType<ApiResponse<Squad>, createSquadParamType>) =>
  useMutation({
    mutationFn: createSquad,
    ...options,
  });
