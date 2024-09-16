import App from '@/App';
import { MainLayout } from '@/components';
import LoginLayout from '@/components/layouts/LoginLayout';
import GroupDetailPage from '@/Pages/GroupDetailPage';
import HomePage from '@/Pages/HomePage';
import LoginPage from '@/Pages/LoginPage';
import MyGroupsPage from '@/Pages/MyGroupsPage';
import MyPage from '@/Pages/MyPage';
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
            path: '/my-groups',
            element: <MyGroupsPage />,
          },
          {
            path: '/my-groups/:groupId',
            element: <GroupDetailPage />,
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
    ],
  },
]);
