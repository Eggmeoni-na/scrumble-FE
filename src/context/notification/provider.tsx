import { notificationContext } from '@/context/notification/context';
import { useUserCookie } from '@/hooks';
import { getDateRange } from '@/utils/getDateRange';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [hasUnreadMessages, setHasUnreadMessages] = useState<boolean | null>(null);
  const { user } = useUserCookie();

  useEffect(() => {
    //TODO: 서버에서 user 체크 해주는 경우 제거
    if (!user) {
      return;
    }

    const { startDateTime, endDateTime } = getDateRange();
    const url = `${import.meta.env.VITE_API_URL}/api/notifications/subscribe?memberId=${user.id}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;
    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onmessage = (e) => {
      console.log('받은 데이터:', e.data);
    };

    eventSource.addEventListener('notificationEvent', (e) => {
      const parsedData = JSON.parse(e.data);
      console.log('이벤트 푸시 - hasUnreadMessages:', parsedData.body.hasUnreadMessages);
      setHasUnreadMessages(parsedData.body.hasUnreadMessages);
    });

    eventSource.onerror = () => {
      console.error('SSE 연결이 끊어졌습니다. 재연결을 시도합니다.');
    };

    return () => eventSource.close();
  }, [user]);

  const value = useMemo(() => ({ hasUnreadMessages, setHasUnreadMessages }), [hasUnreadMessages]);

  useEffect(() => {
    console.log('상태 변경 감지:', hasUnreadMessages);
  }, [hasUnreadMessages]);

  return <notificationContext.Provider value={value}>{children}</notificationContext.Provider>;
};
