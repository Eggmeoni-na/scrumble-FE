import { notificationHandler, squadHandler } from '@/mocks/handler';
import { setupWorker } from 'msw/browser';

const initMocks = async () => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const worker = setupWorker(...squadHandler, ...notificationHandler);
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
};

export { initMocks };
