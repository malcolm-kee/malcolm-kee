import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

let startPromise: Promise<ServiceWorkerRegistration | undefined> | undefined;

export const enableMocking = () => {
  if (!startPromise) {
    startPromise = worker.start({
      onUnhandledRequest: 'bypass',
      quiet: true,
    });
  }
  return startPromise;
};
