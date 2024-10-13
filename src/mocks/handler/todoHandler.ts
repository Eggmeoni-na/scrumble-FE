import { ApiResponse, ToDo } from '@/types';
import { http, HttpResponse } from 'msw';

export const todoHandler = [
  http.get(`${import.meta.env.VITE_MOCK_API_URL}/todos/squads/1/members/2`, () => {
    console.log('Captured a "GET /squads" request');
    return HttpResponse.json<ApiResponse<ToDo[]>>({
      data: [
        {
          toDoAt: '24-10-13',
          toDoDetails: {
            toDoId: 1,
            squadId: 1,
            squadName: '만들어유',
            contents: '밥 먹기',
            todoAt: '24-10-13',
            todoStatus: 'PENDING',
          },
        },
        {
          toDoAt: '24-10-13',
          toDoDetails: {
            toDoId: 2,
            squadId: 1,
            squadName: '만들어유',
            contents: '휴식',
            todoAt: '24-10-13',
            todoStatus: 'PENDING',
          },
        },
        {
          toDoAt: '24-10-13',
          toDoDetails: {
            toDoId: 3,
            squadId: 1,
            squadName: '만들어유',
            contents: '공부하기',
            todoAt: '24-10-13',
            todoStatus: 'COMPLETED',
          },
        },
        {
          toDoAt: '24-10-13',
          toDoDetails: {
            toDoId: 4,
            squadId: 1,
            squadName: '만들어유',
            contents: '쇼핑하기',
            todoAt: '24-10-13',
            todoStatus: 'COMPLETED',
          },
        },
        {
          toDoAt: '24-10-13',
          toDoDetails: {
            toDoId: 5,
            squadId: 1,
            squadName: '만들어유',
            contents: '여행가기',
            todoAt: '24-10-13',
            todoStatus: 'PENDING',
          },
        },
        {
          toDoAt: '24-10-13',
          toDoDetails: {
            toDoId: 6,
            squadId: 1,
            squadName: '만들어유',
            contents: '머리 자르기',
            todoAt: '24-10-13',
            todoStatus: 'COMPLETED',
          },
        },
      ],
      message: 'GET 요청 성공',
      statusCodeValue: 200,
    });
  }),
];
