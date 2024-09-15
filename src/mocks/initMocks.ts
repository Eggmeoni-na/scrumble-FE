import { handlers } from '@/mocks/handlers';
import { setupWorker } from 'msw/browser';

const initMocks = async () => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const worker = setupWorker(...handlers);
  await worker.start();
};

export { initMocks };
