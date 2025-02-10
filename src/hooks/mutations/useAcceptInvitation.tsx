import { acceptSquadInvite } from '@/apis';
import { AcceptSquadInvitationParams, MutateOptionsType } from '@/hooks/mutations/types';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useAcceptInvitation = (options?: MutateOptionsType<ApiResponse<null>, AcceptSquadInvitationParams>) => {
  const { mutateAsync: acceptInvitation } = useMutation({
    mutationFn: acceptSquadInvite,
    ...options,
  });

  return { acceptInvitation };
};

export default useAcceptInvitation;
