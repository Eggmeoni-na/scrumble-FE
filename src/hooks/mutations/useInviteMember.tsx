import { inviteMember } from '@/apis';
import { InviteMemberParamType, MutateOptionsType } from '@/hooks/mutations/types';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useInviteMember = (options: MutateOptionsType<ApiResponse<null>, InviteMemberParamType>) => {
  const { mutate: inviteMemberMutate } = useMutation({
    mutationFn: inviteMember,
    ...options,
  });
  return { inviteMemberMutate };
};

export default useInviteMember;
