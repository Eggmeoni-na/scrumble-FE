import { instance } from '@/apis';
import {
  ApiResponse,
  HasUnreadRequestPayload,
  NotificationRequestPayload,
  NotificationResponse,
  NotificationUpdateRequestPayload,
} from '@/types';

export const getNotifications = async (
  params: NotificationRequestPayload,
): Promise<{ data: NotificationResponse[] }> => {
  const response = await instance.get(`/api/notifications/me`, {
    params,
  });
  return response.data;
};

export const updateNotification = async ({
  notificationId,
  params,
}: {
  notificationId: number;
  params: NotificationUpdateRequestPayload;
}): Promise<ApiResponse<NotificationResponse>> => {
  const { notificationStatus, readFlag } = params;
  const response = await instance.put(`/api/notifications/${notificationId}`, {
    notificationStatus,
    readFlag,
  });
  return response.data;
};

export const hasUnreadNotifications = async (
  params: HasUnreadRequestPayload,
): Promise<{
  data: {
    hasUnreadMessages: boolean;
  };
}> => {
  const response = await instance.get('/api/notifications/unread-exists', {
    params,
  });
  return response.data;
};
