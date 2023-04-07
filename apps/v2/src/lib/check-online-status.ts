export interface CheckOnlineStatusOptions {
  onStatusChange: (isOnline: boolean) => void;
  initialOnline: boolean;
}

export const checkOnlineStatus = ({ onStatusChange, initialOnline }: CheckOnlineStatusOptions) => {
  // I don't use navigator.onLine because it
  // sometimes does not detect extremely slow network,
  // so the solution here is to fetch a simple noop response
  // from server
  let lastStatus = initialOnline;

  const intervalId = setInterval(() => {
    const randomId = Date.now();

    Promise.race([
      fetch(`/online.json?${randomId}`)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        }),
      new Promise<boolean>((fulfill) => setTimeout(() => fulfill(false), 1000)),
      // considered as offline when no response after 1sec
    ]).then((isOnline) => {
      if (lastStatus !== isOnline) {
        onStatusChange(isOnline);
        lastStatus = isOnline;
      }
    });
  }, 3000);

  return function cleanup() {
    clearInterval(intervalId);
  };
};
