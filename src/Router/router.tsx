import App from '@/App';
import { MainLayout } from '@/components';
import LoginLayout from '@/components/layouts/LoginLayout';
import { HomePage, LoginPage, MyPage, ProtectedPage, SquadDetailPage, SquadPage } from '@/Pages';
import GoogleOAuthCallbackPage from '@/Pages/GoogleOAuthLoginPage';
import SelectMemberPage from '@/Pages/SelectMemberPage';
import { Suspense } from 'react';

import { createBrowserRouter, Outlet } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedPage>
                <HomePage />
              </ProtectedPage>
            ),
          },
          {
            path: '/squads',
            element: (
              <ProtectedPage>
                <Suspense fallback={<h1>로딩중</h1>}>
                  <SquadPage />
                </Suspense>
              </ProtectedPage>
            ),
          },
          {
            path: '/squads/:squadId',
            element: (
              <Suspense fallback={<h1>로딩중</h1>}>
                <SquadDetailPage />
              </Suspense>
            ),
          },
          {
            path: '/squads/:squadId/members',
            element: <SelectMemberPage />,
          },
          {
            path: '/me',
            element: <MyPage />,
          },
        ],
      },
      {
        path: '/login',
        element: (
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
        ),
      },
      {
        path: '/login/oauth2/code/google',
        element: <GoogleOAuthCallbackPage />,
      },
    ],
  },
  {
    path: '/*',
    element: <h1>404 Page</h1>,
  },
]);
