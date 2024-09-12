import App from '@/App';
import GroupDetailPage from '@/Pages/GroupDetailPage';
import HomePage from '@/Pages/HomePage';
import LoginPage from '@/Pages/LoginPage';
import MyGroupsPage from '@/Pages/MyGroupsPage';
import MyPage from '@/Pages/MyPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
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
]);
