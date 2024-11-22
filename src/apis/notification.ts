import { instance } from '@/apis';
import { ApiResponse } from '@/types';
import { NotificationRequestPayload, NotificationResponse } from '@/types/notification';

export const getNotifications = async (
  params: NotificationRequestPayload,
): Promise<{ data: NotificationResponse[] }> => {
  const response = await instance.get(`/api/notifications/me`, {
    params,
  });
  return response.data;
};

export const readNotification = async ({
  notificationId,
}: {
  notificationId: number;
}): Promise<ApiResponse<NotificationResponse>> => {
  const response = await instance.put(`/api/notifications/${notificationId}`);
  return response.data;
};
