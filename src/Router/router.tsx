import App from '@/App';
import { SquadIdGuard } from '@/components';
import { Loading } from '@/components/common';
import { LoginLayout, MainLayout } from '@/components/layouts';
import {
  GoogleOAuthCallbackPage,
  HomePage,
  InvitePage,
  LoginPage,
  MyPage,
  NotFoundPage,
  SelectMemberPage,
  SquadDetailPage,
  SquadPage,
} from '@/Pages';
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
              <Suspense fallback={<Loading />}>
                <SquadPage />
              </Suspense>
            ),
          },
          {
            path: '/squads/:squadId',
            element: (
              <Suspense fallback={<Loading />}>
                <SquadDetailPage />
              </Suspense>
            ),
          },
          {
            path: '/squads/:squadId/members',
            element: (
              <SquadIdGuard>
                <SelectMemberPage />
              </SquadIdGuard>
            ),
          },
          {
            path: '/squads/:squadId/invite',
            element: (
              <SquadIdGuard>
                <InvitePage />
              </SquadIdGuard>
            ),
          },
          {
            path: '/me',
            element: (
              <Suspense fallback={<Loading />}>
                <MyPage />
              </Suspense>
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
