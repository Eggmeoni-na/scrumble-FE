import { http, HttpResponse } from 'msw';

const mockData = [
  {
    createdAt: '2024-11-19T05:03:47.691Z',
    notificationId: 1,
    notificationType: 'INVITE_ACCEPT',
    notificationData: {
      userName: 'scrumble',
      squadName: '테스트 스쿼드',
    },
    notificationMessage: '메시지1',
    read: false,
  },
  {
    createdAt: '2024-11-19T05:03:47.691Z',
    notificationId: 2,
    notificationType: 'INVITE_REQUEST',
    notificationData: {
      userName: 'scrumble',
      squadName: '테스트 스쿼드',
      squadId: 1,
    },
    notificationMessage: '메시지2',
    read: true,
  },
];

export const notificationHandler = [
  http.get(`${import.meta.env.VITE_MOCK_API_URL}/api/notifications/me`, ({ request }) => {
    console.log('Captured a "GET /notifications/me" request');

    const url = new URL(request.url);
    const lastNotificationId = Number(url.searchParams.get('lastNotificationId')) || 0;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;

    console.log('lastNotificationId:', lastNotificationId, 'pageSize:', pageSize);

    const filteredData = mockData.filter((item) => item.notificationId > lastNotificationId);
    const data = filteredData.slice(0, pageSize);

    return HttpResponse.json({
      data,
      message: 'GET 요청 성공',
    });
  }),
];
