import { deleteUser } from '@/apis';
import { MutateOptionsType } from '@/hooks/mutations/types';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useDeleteUser = (options: MutateOptionsType<ApiResponse<null>>) => {
  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: deleteUser,
    ...options,
  });

  return { deleteUserMutate };
};
