export const subscribeUserToNotification = async (): Promise<
  NotificationPermission | 'unknown'
> => {
  const permissionResult = await requestNotificationPermission();

  if (permissionResult !== 'granted') {
    return permissionResult;
  }

  if (window.__swRegistration == null) {
    return 'unknown';
  }

  const applicationServerKey = import.meta.env.PUBLIC_WEBPUSH_KEY;
  const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;

  const subscriptionResult = await window.__swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });

  const result = await fetch(`${apiBaseUrl}/subscribe`, {
    method: 'POST',
    body: JSON.stringify(subscriptionResult),
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });

  if (!result.ok) {
    console.error('Fail to call subscribe', result);
    return 'unknown';
  }

  return permissionResult;
};

export const requestNotificationPermission = async (): Promise<
  NotificationPermission | 'unknown'
> => {
  try {
    if (!isPushNotificationSupported()) {
      return 'unknown';
    }

    const permissionResult = await requestPermission();

    return permissionResult;
  } catch (err) {
    console.group('Unexpected error when requesting permission');
    console.error(err);
    console.groupEnd();

    return 'unknown';
  }
};

/**
 * Normalize `Notification.requestPermission` as its spec changes.
 */
const requestPermission = (): Promise<NotificationPermission> =>
  new Promise((fulfill, reject) => {
    const maybePermissionResult = Notification.requestPermission(function (result) {
      fulfill(result);
    });

    if (maybePermissionResult != null) {
      maybePermissionResult.then(fulfill, reject);
    }
  });

export const isPushNotificationSupported = () =>
  typeof navigator !== 'undefined' &&
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  'PushManager' in window;
