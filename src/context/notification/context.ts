import { createContext, Dispatch, SetStateAction } from 'react';

type NotificationContextValue = {
  hasUnreadMessages: boolean | null;
  setHasUnreadMessages: Dispatch<SetStateAction<boolean | null>>;
};

export const notificationContext = createContext<NotificationContextValue>({
  hasUnreadMessages: null,
  setHasUnreadMessages: () => {},
});
