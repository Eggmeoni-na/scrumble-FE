type NotificationType = 'INVITE_REQUEST' | 'INVITE_ACCEPT';

type NotificationData = {
  userName: string;
  squadName: string;
  squadId?: number;
};

export type NotificationRequestPayload = {
  startDateTime: string;
  endDateTime: string;
  lastNotificationId: number;
  pageSize: number;
};

export type NotificationResponse = {
  notificationId: number;
  notificationType: NotificationType;
  notificationMessage: string;
  createdAt: string;
  notificationData: NotificationData;
  read: boolean;
};
