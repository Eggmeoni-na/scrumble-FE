import { CreateSquad } from '@/components/common/Modal/ModalContents';
import { useCreateSquadMutation } from '@/hooks/mutations/useCreateSquad';
import { useModal } from '@/hooks/useModal';

import { useToastStore } from '@/stores/toast';
import { useNavigate } from 'react-router-dom';

const useCreateSquad = () => {
  const navigate = useNavigate();
  const { ModalContainer, openModal } = useModal();
  const createToast = useToastStore((state) => state.createToast);
  const { mutate: createSquad } = useCreateSquadMutation({
    onSuccess: async ({ data }) => {
      navigate(`/squads/${data.squadId}`);
      createToast({ type: 'success', message: '스쿼드가 생성되었어요 🎉', duration: 2000, showCloseButton: false });
    },
    onError: () => {
      createToast({ type: 'failed', message: '스쿼드 생성에 실패했어요 😢' });
    },
  });

  const handleCreateSquad = async () => {
    const res = await openModal(CreateSquad);
    if (!res.ok || !res.value) return;
    createSquad({ squadName: res.value });
  };

  return { ModalContainer, handleCreateSquad };
};

export default useCreateSquad;
