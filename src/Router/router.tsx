import App from '@/App';
import { SquadIdGuard } from '@/components';
import { FallbackWrapper } from '@/components/common/ErrorBoundary';
import { LoginLayout, MainLayout } from '@/components/layouts';
import ProtectedRoute from '@/components/ProtectedRoute';
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

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <FallbackWrapper>
              <HomePage />
            </FallbackWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: 'squads',
        children: [
          {
            index: true,
            element: (
              <FallbackWrapper>
                <SquadPage />
              </FallbackWrapper>
            ),
          },
          {
            path: ':squadId',
            element: (
              <FallbackWrapper>
                <SquadDetailPage />
              </FallbackWrapper>
            ),
          },
          {
            path: ':squadId/members',
            element: (
              <SquadIdGuard>
                <FallbackWrapper>
                  <SelectMemberPage />
                </FallbackWrapper>
              </SquadIdGuard>
            ),
          },
          {
            path: ':squadId/invite',
            element: (
              <SquadIdGuard>
                <FallbackWrapper>
                  <InvitePage />
                </FallbackWrapper>
              </SquadIdGuard>
            ),
          },
        ],
      },
      {
        path: 'me',
        element: (
          <MainLayout>
            <MyPage />
          </MainLayout>
        ),
      },
      {
        path: 'login',
        element: (
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
        ),
      },
      {
        path: 'auth',
        element: <GoogleOAuthCallbackPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
