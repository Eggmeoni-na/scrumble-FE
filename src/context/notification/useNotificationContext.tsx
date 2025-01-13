import { notificationContext } from '@/context/notification/context';
import { useContext } from 'react';

export const useNotificationContext = () => {
  const context = useContext(notificationContext);
  if (!context) {
    throw new Error('notificationContext is not available.');
  }
  return context;
};
