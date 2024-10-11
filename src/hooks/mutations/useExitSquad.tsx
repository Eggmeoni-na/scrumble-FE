import { exitSquad } from '@/apis';
import { ActionPrompt } from '@/components/common/Modal/ModalContents';

import { ExitAndDeleteSquadNameParamType, MutateOptionsType } from '@/hooks/mutations';
import { useModal } from '@/hooks/useModal';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useExitSquad = (
  squadId: number,
  hasMembers: boolean,
  options: MutateOptionsType<ApiResponse<null>, ExitAndDeleteSquadNameParamType>,
) => {
  const { ModalContainer: ExitSquadModal, openModal } = useModal();
  const { mutate: exitSquadMutate } = useMutation({
    mutationFn: exitSquad,
    ...options,
  });

  const handleSquadExit = async () => {
    const checkInfo = {
      type: 'confirm',
      text: '확인',
      message: '나가기 전에 리더 권한을 위임해주세요.',
      displayCancel: false,
    } as const;

    const exitInfo = {
      type: 'delete',
      text: '나가기',
      message: '정말로 스쿼드를 나가시겠어요?',
      displayCancel: true,
    } as const;

    const res = await openModal(ActionPrompt, undefined, hasMembers ? checkInfo : exitInfo);
    if (res.ok && !hasMembers) {
      exitSquadMutate({ squadId });
    }
  };

  return { ExitSquadModal, handleSquadExit };
};

export default useExitSquad;
