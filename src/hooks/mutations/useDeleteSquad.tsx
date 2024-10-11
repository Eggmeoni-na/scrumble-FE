import { deleteSquad } from '@/apis';
import SquadActionWarning from '@/components/common/Modal/ModalContents/SquadActionWarning';
import { ExitAndDeleteSquadNameParamType, MutateOptionsType } from '@/hooks/mutations';
import { useModal } from '@/hooks/useModal';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useDeleteSquad = (
  squadId: number,
  options: MutateOptionsType<ApiResponse<null>, ExitAndDeleteSquadNameParamType>,
) => {
  const { ModalContainer: DeleteSquadModal, openModal } = useModal();
  const { mutate: deleteSquadMutate } = useMutation({
    mutationFn: deleteSquad,
    ...options,
  });

  const handleSquadDelete = async () => {
    const deleteInfo = {
      type: 'delete',
      text: '삭제',
      message: '정말로 스쿼드를 삭제할까요?',
      displayCancel: true,
    } as const;

    const res = await openModal(SquadActionWarning, undefined, deleteInfo);
    if (res.ok) {
      deleteSquadMutate({ squadId });
    }
  };

  return { DeleteSquadModal, handleSquadDelete };
};

export default useDeleteSquad;
