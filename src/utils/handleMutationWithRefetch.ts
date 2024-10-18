import { useToastStore } from '@/stores/toast';
import { useQueryClient } from '@tanstack/react-query';

export const handleMutationWithRefetch = (type: string, queryKey: readonly unknown[]) => {
  const createToast = useToastStore((state) => state.createToast);
  const queryClient = useQueryClient();
  return {
    onSuccess: () => {
      createToast({
        type: 'success',
        message: `${type}에 성공했어요`,
        duration: 2000,
        showCloseButton: false,
      });
      queryClient.refetchQueries({
        queryKey,
      });
    },
    onError: () => {
      createToast({
        type: 'failed',
        message: `${type}에 실패했어요`,
        duration: 2000,
        showCloseButton: false,
      });
    },
  };
};
