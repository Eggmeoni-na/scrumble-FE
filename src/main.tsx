import { initMocks } from '@/mocks/initMocks';
import { router } from '@/Router/router';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';

initMocks().then(() => {
  createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
});
