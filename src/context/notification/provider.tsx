import { notificationContext } from '@/context/notification/context';
import { useUserCookie } from '@/hooks';
import { getDateRange } from '@/utils/getDateRange';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [hasUnreadMessages, setHasUnreadMessages] = useState(true);
  const { user } = useUserCookie();

  useEffect(() => {
    //TODO: 서버에서 user 체크 해주는 경우 제거
    if (!user) {
      return;
    }

    const { startDateTime, endDateTime } = getDateRange();
    const url = `${import.meta.env.VITE_API_URL}/api/notifications/subscribe?memberId=${user.id}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;
    const eventSource = new EventSource(url);

    eventSource.addEventListener('notificationEvent', (e) => {
      const parsedData = JSON.parse(e.data);
      setHasUnreadMessages(parsedData.body.hasUnreadMessages);
    });

    eventSource.onerror = () => eventSource.close();

    return () => eventSource.close();
  }, [user]);

  const value = useMemo(() => ({ hasUnreadMessages, setHasUnreadMessages }), [hasUnreadMessages]);

  return <notificationContext.Provider value={value}>{children}</notificationContext.Provider>;
};
