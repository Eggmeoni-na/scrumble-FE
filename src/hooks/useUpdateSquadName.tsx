import { SquadForm } from '@/components/common/Modal/ModalContents';
import { useUpdateSquadMutation } from '@/hooks/mutations/useSquad';
import { squadKeys } from '@/hooks/queries/useSquad';
import { useModal } from '@/hooks/useModal';

import { useToastStore } from '@/stores/toast';
import { SquadDetail } from '@/types';
import { useQueryClient } from '@tanstack/react-query';

const useUpdateSquadName = (squadId: number) => {
  const { ModalContainer, openModal } = useModal();
  const createToast = useToastStore((state) => state.createToast);
  const queryClient = useQueryClient();
  const { mutate: updateSquadName } = useUpdateSquadMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: squadKeys.squadDetail(squadId),
      });

      const oldData = queryClient.getQueryData<SquadDetail>(squadKeys.squadDetail(squadId));

      console.log('oldData:', oldData);

      queryClient.setQueryData(squadKeys.squadDetail(squadId), (prevData: SquadDetail) => ({
        ...prevData,
        squadName: data.squadName,
      }));

      return oldData;
    },
    onSuccess: async () => {
      createToast({ type: 'success', message: '스쿼드명이 수정되었어요', duration: 2000, showCloseButton: false });
      await queryClient.refetchQueries({
        queryKey: squadKeys.squadDetail(squadId),
      });
    },
    onError: (error, data, context) => {
      if (context) {
        queryClient.setQueryData(squadKeys.squadDetail(squadId), context);
      }
      createToast({ type: 'failed', message: '스쿼드명 수정에 실패했어요 😢' });
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: squadKeys.squadDetail(squadId),
      }),
  });

  const handleUpdateSquadName = async () => {
    const res = await openModal(SquadForm, { isEdit: true });
    if (!res.ok || !res.value) return;
    updateSquadName({ squadId, squadName: res.value });
  };

  return { ModalContainer, handleUpdateSquadName };
};

export default useUpdateSquadName;
