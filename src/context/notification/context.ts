import { createContext, Dispatch, SetStateAction } from 'react';

type NotificationStateContextValue = {
  hasUnreadMessages: boolean;
};

type NotificationUpdateContextValue = {
  setHasUnreadMessages: Dispatch<SetStateAction<boolean>>;
};

export const NotificationStateContext = createContext<NotificationStateContextValue>({
  hasUnreadMessages: false,
});

export const NotificationUpdateContext = createContext<NotificationUpdateContextValue>({
  setHasUnreadMessages: () => {},
});
