import { createSquad } from '@/apis';
import { SquadForm } from '@/components/common/Modal/ModalContents';
import { CreateSquadParamType, MutateOptionsType } from '@/hooks/mutations';
import { useModal } from '@/hooks/useModal';
import { ApiResponse, Squad } from '@/types';
import { useMutation } from '@tanstack/react-query';

const useCreateSquad = (options: MutateOptionsType<ApiResponse<Squad>, CreateSquadParamType>) => {
  const { ModalContainer: CreateSquadModal, openModal } = useModal();
  const { mutate: createSquadMutate } = useMutation({
    mutationFn: createSquad,
    ...options,
  });

  const handleCreateSquad = async () => {
    const res = await openModal(SquadForm);
    if (!res.ok || !res.value) return;
    createSquadMutate({ squadName: res.value });
  };

  return { CreateSquadModal, handleCreateSquad };
};

export default useCreateSquad;
