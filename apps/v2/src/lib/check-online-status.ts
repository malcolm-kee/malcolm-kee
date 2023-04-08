export interface CheckOnlineStatusOptions {
  onStatusChange: (isOnline: boolean) => void;
  initialOnline: boolean;
  checkIntervalMs?: number;
  timeoutMs?: number;
}

export const checkOnlineStatus = ({
  onStatusChange,
  initialOnline,
  checkIntervalMs = 3000,
  timeoutMs = 1000,
}: CheckOnlineStatusOptions) => {
  // I don't rely navigator.onLine because it
  // sometimes does not detect extremely slow network,
  // so the solution here is to fetch a simple noop response
  // from server
  let lastStatus = initialOnline;
  let timerId: ReturnType<typeof setTimeout>;

  function getOnlineStatus() {
    Promise.race([
      fetch(`/online.json?${Date.now()}`) // add a random id to avoid cached response
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        }),
      new Promise<boolean>((fulfill) => setTimeout(() => fulfill(false), timeoutMs)),
      // considered as offline when no response after timeout
    ]).then((isOnline) => {
      if (lastStatus !== isOnline) {
        onStatusChange(isOnline);
        lastStatus = isOnline;
      }
      timerId = setTimeout(getOnlineStatus, checkIntervalMs);
    });
  }

  timerId = setTimeout(getOnlineStatus, checkIntervalMs);

  function onOnlineEvent() {
    clearTimeout(timerId);
    getOnlineStatus();
  }

  window.addEventListener('online', onOnlineEvent);
  window.addEventListener('offline', onOnlineEvent);

  return function cleanup() {
    clearTimeout(timerId);
    window.removeEventListener('online', onOnlineEvent);
    window.removeEventListener('offline', onOnlineEvent);
  };
};
