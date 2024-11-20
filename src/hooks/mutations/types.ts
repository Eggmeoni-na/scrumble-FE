import { PostTodoRequest, UpdateTodoRequest } from '@/types';
import { UseMutationOptions } from '@tanstack/react-query';

/**
 * @type {T} - return value
 */
export type MutateOptionsType<T, U, Context = unknown> = UseMutationOptions<T, Error, U, Context>;
export type CreateSquadParamType = { squadName: string };
export type UpdateSquadNameParamType = { squadId: number; squadName: string };
export type ExitAndDeleteSquadNameParamType = { squadId: number };
export type AssignSquadLeaderParamType = { squadId: number; newLeaderId: number };
export type RemoveUserFromSquadParamType = { squadId: number; kickedMemberId: number };

/**
 * Todo
 */
export type CreateTodoParamType = { squadId: number; newTodo: PostTodoRequest };
export type UpdateTodoParamType = { toDoId: number; newTodo: UpdateTodoRequest };
export type DeleteTodoParamType = { toDoId: number; squadId: number };

/**
 * Invite
 */
export type InviteMemberParamType = { squadId: number; memberId: number };
