import { instance } from '@/apis';
import { NotificationRequestPayload, NotificationResponse } from '@/types/notification';

export const getNotifications = async (
  params: NotificationRequestPayload,
): Promise<{ data: NotificationResponse[] }> => {
  const response = await instance.get(`/api/notifications/me`, {
    params,
  });
  return response.data;
};
