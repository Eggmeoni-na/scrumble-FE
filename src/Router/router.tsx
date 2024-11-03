import App from '@/App';
import { MainLayout } from '@/components';
import LoginLayout from '@/components/layouts/LoginLayout';
import { HomePage, LoginPage, MyPage, ProtectedPage, SquadDetailPage, SquadPage } from '@/Pages';
import GoogleOAuthCallbackPage from '@/Pages/GoogleOAuthLoginPage';
import InvitePage from '@/Pages/InvitePage';
import NotFoundPage from '@/Pages/NotFoundPage';
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
              <Suspense fallback={<h1>로딩중</h1>}>
                <SquadPage />
              </Suspense>
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
            path: '/squads/:squadId/invite',
            element: <InvitePage />,
          },
          {
            path: '/me',
            element: (
              <ProtectedPage>
                <MyPage />
              </ProtectedPage>
            ),
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
    element: <NotFoundPage />,
  },
]);
