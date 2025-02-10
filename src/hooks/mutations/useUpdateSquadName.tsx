import { updateSquadName } from '@/apis';
import { SquadForm } from '@/components/common/Modal/ModalContents';
import { MutateOptionsType, UpdateSquadNameParamType } from '@/hooks/mutations';
import { useModal } from '@/hooks/useModal';
import { ApiResponse, SquadDetail } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useUpdateSquadName = (
  squadId: number,
  squadName: string,
  options: MutateOptionsType<ApiResponse<SquadDetail>, UpdateSquadNameParamType, SquadDetail>,
) => {
  const { ModalContainer: UpdateSquadNameModal, openModal } = useModal();
  const { mutate: updateSquadNameMutate } = useMutation({
    mutationFn: updateSquadName,
    ...options,
  });

  const handleUpdateSquadName = async () => {
    const res = await openModal(SquadForm, { squadName, isEdit: true });
    if (!res.ok || !res.value) return;
    updateSquadNameMutate({ squadId, squadName: res.value });
  };

  return { UpdateSquadNameModal, handleUpdateSquadName };
};

export default useUpdateSquadName;
