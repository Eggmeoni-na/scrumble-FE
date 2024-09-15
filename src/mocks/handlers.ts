import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/posts', () => {
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

  http.post('/posts', async ({ request }) => {
    const newPost = await request.json();
    return HttpResponse.json(
      {
        data: newPost,
        message: 'POST 요청 성공!',
      },
      { status: 201 },
    );
  }),

  http.delete('/posts/:id', ({ params }) => {
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

  http.get('/user', ({ cookies }) => {
    const { session } = cookies;

    if (!session) {
      return new HttpResponse(null, { status: 401 });
    }
  }),
];
