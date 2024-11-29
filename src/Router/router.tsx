import App from '@/App';
import { MainLayout } from '@/components';
import Loading from '@/components/common/Loading';
import LoginLayout from '@/components/layouts/LoginLayout';
import SquadIdGuard from '@/components/SquadIdGuard';
import { HomePage, LoginPage, MyPage, SquadDetailPage, SquadPage } from '@/Pages';
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
