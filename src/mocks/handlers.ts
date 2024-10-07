import { ApiResponse, Squad } from '@/types';
import { http, HttpResponse } from 'msw';

const mockURL = '/mock-api';

export const handlers = [
  http.get(`${mockURL}/post`, () => {
    console.log('Captured a "GET /posts" request');
    return HttpResponse.json({
      data: Array.from(
        [
          { id: 1, title: 'title' },
          { id: 2, title: 'title' },
        ].values(),
      ),
      message: 'GET 요청 성공',
    });
  }),

  http.post(`${mockURL}/posts`, async ({ request }) => {
    const newPost = await request.json();
    return HttpResponse.json(
      {
        data: newPost,
        message: 'POST 요청 성공!',
      },
      { status: 201 },
    );
  }),

  http.delete(`${mockURL}/posts/:id`, ({ params }) => {
    const { id } = params;
    const deletedPost = { id, title: 'title' };

    if (!deletedPost) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      data: deletedPost,
      message: 'DELETE 요청 성공!',
    });
  }),

  http.get(`${mockURL}/user`, ({ cookies }) => {
    const { session } = cookies;

    if (!session) {
      return new HttpResponse(null, { status: 401 });
    }
  }),

  http.get(`${mockURL}/squads`, () => {
    console.log('Captured a "GET /squads" request');
    return HttpResponse.json({
      data: [
        { squadId: 1, squadName: '만들어유' },
        { squadId: 2, squadName: '해볼까유' },
      ],
      message: 'GET 요청 성공',
    });
  }),

  http.post(`${mockURL}/squads`, async () =>
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
];
