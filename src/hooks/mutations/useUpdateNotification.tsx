import { updateNotification } from '@/apis';
import { MutateOptionsType } from '@/hooks/mutations/types';
import { notiKeys } from '@/hooks/queries';
import { InfiniteQueryData } from '@/hooks/queries/types';
import { ApiResponse, NotificationResponse } from '@/types';
import { optimisticUpdateMutateHandler } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateNotification = (
  options?: MutateOptionsType<
    ApiResponse<NotificationResponse>,
    { notificationId: number },
    { oldData: InfiniteQueryData<ApiResponse<NotificationResponse[]>> | never[] | undefined }
  >,
) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateNotificationMutate } = useMutation({
    mutationFn: updateNotification,
    onMutate: async (data) => {
      const oldData = await optimisticUpdateMutateHandler<InfiniteQueryData<ApiResponse<NotificationResponse[]>>>(
        queryClient,
        notiKeys.all,
        (prevData: InfiniteQueryData<ApiResponse<NotificationResponse[]>>) => ({
          ...prevData,
          pages: prevData.pages.map((page) => ({
            ...page,
            data: page.data.map((prevNotification) =>
              prevNotification.notificationId === data.notificationId
                ? {
                    ...prevNotification,
                    notificationStatus: data.params.notificationStatus,
                    read: data.params.readFlag,
                  }
                : prevNotification,
            ),
          })),
        }),
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

  return { updateNotificationMutate };
};

export default useUpdateNotification;
