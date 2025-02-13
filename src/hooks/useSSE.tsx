import { baseURL } from '@/apis';
import useUserCookie from '@/hooks/useUserCookie';
import { useNotificationStore } from '@/stores';
import { getDateRange } from '@/utils/getDateRange';
import { useEffect } from 'react';

const useSSE = () => {
  const { user } = useUserCookie();

  useEffect(() => {
    if (!user) {
      return;
    }

    const { startDateTime, endDateTime } = getDateRange();
    const url = `${baseURL}/api/notifications/subscribe?memberId=${user.id}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;
    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.addEventListener('notificationEvent', (e) => {
      const parsedData = JSON.parse(e.data);
      const hasUnread = parsedData.body.hasUnreadMessages as boolean;
      useNotificationStore.getState().setHasUnread(hasUnread);
    });

    eventSource.onerror = () => {
      console.error('SSE 연결이 끊어졌습니다. 재연결을 시도합니다.');
    };

    return () => eventSource.close();
  }, [user]);
};

export default useSSE;
