import * as TypingsWorker from './typings.worker';

export function getWorker() {
  return (
    typeof window === 'object' &&
    ((TypingsWorker as any)() as typeof TypingsWorker & Worker)
  );
}
