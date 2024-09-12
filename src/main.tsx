import { router } from '@/Router/router';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
