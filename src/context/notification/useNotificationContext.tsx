import { NotificationStateContext, NotificationUpdateContext } from '@/context/notification/context';
import { useContext } from 'react';

export const useNotificationStateContext = () => {
  const context = useContext(NotificationStateContext);
  if (!context) {
    throw new Error('NotificationStateContext is not available.');
  }
  return context;
};

export const useNotificationUpdateContext = () => {
  const context = useContext(NotificationUpdateContext);
  if (!context) {
    throw new Error('NotificationUpdateContext is not available.');
  }
  return context;
};
