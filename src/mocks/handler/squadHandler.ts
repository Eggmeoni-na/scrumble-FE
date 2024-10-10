import { ApiResponse, Squad, SquadDetail } from '@/types';
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
    return HttpResponse.json<ApiResponse<SquadDetail>>({
      statusCodeValue: 0,
      data: {
        squadId: 1,
        squadName: '만들어유만들어유유',
        mySquadMemberRole: 'LEADER',
        squadMembers: [
          {
            memberId: 0,
            profileImg: '',
            name: '김둘리',
            squadMemberRole: 'LEADER',
          },
          {
            memberId: 1,
            profileImg: '',
            name: '고길동',
            squadMemberRole: 'NORMAL',
          },
        ],
      },
      message: 'GET 요청 성공',
    });
  }),

  http.put(`${import.meta.env.VITE_MOCK_API_URL}/squads/1`, () => {
    console.log('Captured a "PUT /squads/1" request');
    return HttpResponse.json(
      {
        statusCodeValue: 0,
        data: {
          squadId: 1,
          squadName: '바꿨수다',
        },
        message: 'PUT 요청 성공',
      },
      {
        status: 200,
      },
      // {
      //   statusCodeValue: 401,
      //   message: '허용할 수 없는 접근입니다.',
      //   data: null,
      // },
    );
  }),
];
