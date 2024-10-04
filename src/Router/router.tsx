import App from '@/App';
import { MainLayout } from '@/components';
import LoginLayout from '@/components/layouts/LoginLayout';
import { HomePage, LoginPage, MyPage, ProtectedPage, SquadDetailPage, SquadPage } from '@/Pages';
import GoogleOAuthCallbackPage from '@/Pages/GoogleOAuthLoginPage';
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
            element: <HomePage />,
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
            element: <SquadDetailPage />,
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
]);
