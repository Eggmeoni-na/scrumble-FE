import { router } from '@/Router/router';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <RouterProvider router={router} />
  </CookiesProvider>,
);
