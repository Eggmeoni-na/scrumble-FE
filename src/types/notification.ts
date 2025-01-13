type NotificationType = 'INVITE_REQUEST' | 'INVITE_ACCEPT';
type NotificationStatusType = 'PENDING' | 'COMPLETED';

type NotificationData = {
  squadId: number;
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
  notificationStatus: NotificationStatusType;
  read: boolean;
};

export type NotificationUpdateRequestPayload = {
  notificationStatus: NotificationStatusType;
  readFlag: boolean;
};
