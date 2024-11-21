import { getNotifications } from '@/apis/notification';
import { infiniteQueryOptions } from '@tanstack/react-query';

export const notiKeys = {
  all: ['notifications'] as const,
};

const startDateTime = new Date().toISOString();
const currentDate = new Date(startDateTime);
const endDateTime = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

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
      const lastToDoId = lastPage?.data[lastPage.data.length - 1].notificationId ?? null;
      return lastToDoId;
    },
    initialPageParam: 0,
    select: (data) => (data.pages ?? []).flatMap((page) => page.data),
    refetchOnWindowFocus: false,
  });

export default notificationInfiniteQueryOptions;
