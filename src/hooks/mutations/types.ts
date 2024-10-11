import { UseMutationOptions } from '@tanstack/react-query';

/**
 * @type {T} - return value
 */
export type MutateOptionsType<T, U, Context = unknown> = UseMutationOptions<T, Error, U, Context>;
export type CreateSquadParamType = { squadName: string };
export type UpdateSquadNameParamType = { squadId: number; squadName: string };
export type DeleteSquadNameParamType = { squadId: number };