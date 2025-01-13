import { createContext, Dispatch, SetStateAction } from 'react';

type NotificationContextValue = {
  hasUnreadMessages: boolean;
  setHasUnreadMessages: Dispatch<SetStateAction<boolean>>;
};

export const notificationContext = createContext<NotificationContextValue>({
  hasUnreadMessages: false,
  setHasUnreadMessages: () => {},
});
