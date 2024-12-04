import { readNotification } from '@/apis/notification';
import { MutateOptionsType } from '@/hooks/mutations/types';
import { notiKeys } from '@/hooks/queries';
import { InfiniteQueryData } from '@/hooks/queries/types';
import { ApiResponse } from '@/types';
import { NotificationResponse } from '@/types/notification';
import { optimisticUpdateMutateHandler } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useReadNotification = (
  options?: MutateOptionsType<
    ApiResponse<NotificationResponse>,
    { notificationId: number },
    { oldData: InfiniteQueryData<ApiResponse<NotificationResponse[]>> | never[] | undefined }
  >,
) => {
  const queryClient = useQueryClient();
  const { mutate: readNotificationMutate } = useMutation({
    mutationFn: readNotification,
    onMutate: async (data) => {
      const oldData = await optimisticUpdateMutateHandler<InfiniteQueryData<ApiResponse<NotificationResponse[]>>>(
        queryClient,
        notiKeys.all,
        (prevData: InfiniteQueryData<ApiResponse<NotificationResponse[]>>) => {
          const updatedPages = [...prevData.pages];
          updatedPages.some((page, pageIndex) => {
            const targetIndex = page.data.findIndex((v) => v.notificationId === data.notificationId);
            if (targetIndex === -1) return false;

            const updatedData = [...page.data];
            updatedData[targetIndex] = {
              ...updatedData[targetIndex],
              read: true,
            };
            updatedPages[pageIndex] = { ...page, data: updatedData };
            return true;
          });

          return { ...prevData, pages: updatedPages };
        },
      );
      return { oldData };
    },
    onError: (error, variables, context) => {
      if (context?.oldData) {
        queryClient.setQueryData(notiKeys.all, context.oldData);
      }
    },
    ...options,
  });

  return { readNotificationMutate };
};
