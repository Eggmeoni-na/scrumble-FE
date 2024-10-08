import { ApiResponse, Squad } from '@/types';
import { http, HttpResponse } from 'msw';

export const squadHandler = [
  http.get(`${import.meta.env.VITE_MOCK_API_URL}/squads`, () => {
    console.log('Captured a "GET /squads" request');
    return HttpResponse.json({
      data: [
        { squadId: 1, squadName: '만들어유' },
        { squadId: 2, squadName: '해볼까유' },
      ],
      message: 'GET 요청 성공',
    });
  }),

  http.post(`${import.meta.env.VITE_MOCK_API_URL}/squads`, async () =>
    HttpResponse.json<ApiResponse<Squad>>(
      {
        data: {
          squadId: 1,
          squadName: '만들어유',
        },
        message: 'POST 요청 성공!',
        statusCodeValue: 0,
      },
      { status: 201 },
    ),
  ),

  http.get(`${import.meta.env.VITE_MOCK_API_URL}/squads/1`, () => {
    console.log('Captured a "GET /squads/1" request');
    return HttpResponse.json({
      data: {
        squadId: 1,
        squadName: '만들어유만들어유유',
        squadMembers: [
          {
            memberId: 0,
            profileImg: '',
            name: '김둘리',
          },
        ],
      },
      message: 'GET 요청 성공',
    });
  }),
];
