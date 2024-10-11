import { deleteSquad } from '@/apis';
import SquadActionWarning from '@/components/common/Modal/ModalContents/SquadActionWarning';
import { DeleteSquadNameParamType, MutateOptionsType } from '@/hooks/mutations';
import { useModal } from '@/hooks/useModal';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useDeleteSquad = (
  squadId: number,
  hasMembers: boolean,
  options: MutateOptionsType<ApiResponse<null>, DeleteSquadNameParamType>,
) => {
  const { ModalContainer: DeleteSquadModal, openModal } = useModal();
  const { mutate: deleteSquadMutate } = useMutation({
    mutationFn: deleteSquad,
    ...options,
  });

  const handleSquadDelete = async () => {
    const res = await openModal(SquadActionWarning, undefined, {
      type: `${hasMembers ? 'confirm' : 'delete'}`,
      text: `${hasMembers ? '확인' : '삭제'}`,
      message: `${hasMembers ? '스쿼드 멤버가 존재하면 삭제할 수 없어요.' : '정말로 스쿼드를 삭제할까요?'}`,
      displayCancel: false,
    });
    if (res.ok && !hasMembers) {
      deleteSquadMutate({ squadId });
    }
  };

  return { DeleteSquadModal, handleSquadDelete };
};

export default useDeleteSquad;
