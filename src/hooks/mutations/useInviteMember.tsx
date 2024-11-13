import { inviteMemberApi } from '@/apis/mockApi';
import { InviteMemberParamType, MutateOptionsType } from '@/hooks/mutations/types';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useInviteMember = (options: MutateOptionsType<ApiResponse<null>, InviteMemberParamType>) => {
  const { mutate: searchMemberMutate } = useMutation({
    mutationFn: inviteMemberApi,
    ...options,
  });
  return { searchMemberMutate };
};

export default useInviteMember;
