import { removeUserFromSquad } from '@/apis';
import { ActionModal } from '@/components/common/Modal/ModalContents';

import { MutateOptionsType, RemoveUserFromSquadParamType } from '@/hooks/mutations';
import { useModal } from '@/hooks/useModal';
import { ApiResponse, SquadMember } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useRemoveUserFromSquad = (
  squadId: number,
  member: SquadMember,
  options: MutateOptionsType<ApiResponse<null>, RemoveUserFromSquadParamType>,
) => {
  const { ModalContainer: RemoveUserActionPrompt, openModal } = useModal();
  const { mutate: deleteSquadMutate } = useMutation({
    mutationFn: removeUserFromSquad,
    ...options,
  });

  const handleRemoveUser = async () => {
    const removeInfo = {
      text: '강퇴',
      type: 'delete',
      message: `${member.name}님을 강퇴하시겠어요?`,
      displayCancel: true,
    } as const;

    const res = await openModal(ActionModal, undefined, removeInfo);
    if (res.ok) {
      deleteSquadMutate({ squadId, kickedMemberId: member.memberId });
    }
  };

  return { RemoveUserActionPrompt, handleRemoveUser };
};

export default useRemoveUserFromSquad;
