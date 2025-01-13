import { getNotifications } from '@/apis/notification';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { formatISO, subDays } from 'date-fns';

export const notiKeys = {
  all: ['notifications'] as const,
};

const today = new Date();
const startDateTime = formatISO(subDays(today, 7));
const endDateTime = formatISO(today);

export const notificationInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: notiKeys.all,
    queryFn: ({ pageParam }) =>
      getNotifications({
        startDateTime,
        endDateTime,
        lastNotificationId: pageParam,
        pageSize: 10,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data || lastPage.data.length === 0) {
        return null;
      }

      const lastNotificationId = lastPage.data[lastPage.data.length - 1].notificationId;
      return lastNotificationId; // 마지막 notificationId를 반환
    },
    initialPageParam: 999999,
    select: (data) => (data.pages ?? []).flatMap((page) => page.data),
    refetchOnWindowFocus: false,
  });

export default notificationInfiniteQueryOptions;
