import App from '@/App';
import { MainLayout } from '@/components';
import LoginLayout from '@/components/layouts/LoginLayout';
import { HomePage, LoginPage, MyPage, SquadDetailPage, SquadPage } from '@/Pages';
import GoogleOAuthCallbackPage from '@/Pages/GoogleOAuthLoginPage';

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
            path: '/squad',
            element: <SquadPage />,
          },
          {
            path: '/squad/:groupId',
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
