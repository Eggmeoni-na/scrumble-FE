import App from '@/App';
import { SquadIdGuard } from '@/components';
import { FallbackWrapper } from '@/components/common/ErrorBoundary';
import { LoginLayout } from '@/components/layouts';
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
        element: (
          <FallbackWrapper>
            <ProtectedRoute />
          </FallbackWrapper>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'squads',
            children: [
              {
                index: true,
                element: <SquadPage />,
              },
              {
                path: ':squadId',
                children: [
                  {
                    index: true,
                    element: <SquadDetailPage />,
                  },
                  {
                    element: <SquadIdGuard />,
                    children: [
                      {
                        path: 'members',
                        element: <SelectMemberPage />,
                      },
                      {
                        path: 'invite',
                        element: <InvitePage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: 'me',
            element: <MyPage />,
          },
        ],
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
