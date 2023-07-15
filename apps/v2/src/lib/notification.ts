const applicationServerKey = import.meta.env.PUBLIC_WEBPUSH_KEY;
const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;

export const subscribeUserToNotification = async (): Promise<
  NotificationPermission | 'unknown'
> => {
  const permissionResult = await requestNotificationPermission();

  if (permissionResult !== 'granted') {
    return permissionResult;
  }

  const isAlreadySubscribed = await checkIsAlreadySubscribed();

  if (isAlreadySubscribed) {
    return 'granted';
  }

  const swRegistration = await getSwRegistration();

  const subscriptionResult = await swRegistration.pushManager.subscribe({
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
 * Normalize `Notification.requestPermission` as its spec changed.
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

export async function toggleSubscription() {
  const isAlreadySubscribed = await checkIsAlreadySubscribed();

  if (isAlreadySubscribed) {
    await unsubscribe();
    return false;
  } else {
    const result = await subscribeUserToNotification();

    if (result === 'granted') {
      delete document.documentElement.dataset.subscribable;
    }

    return true;
  }
}

export async function checkIsAlreadySubscribed() {
  const subscription = await getCurrentSubscription();

  return subscription != null;
}

export async function unsubscribe() {
  const subscription = await getCurrentSubscription();

  if (subscription) {
    await subscription.unsubscribe();
    document.documentElement.dataset.subscribable = 'true';
  }
}

const getSwRegistration = () => navigator.serviceWorker.ready;

const getCurrentSubscription = () =>
  getSwRegistration().then((reg) => reg.pushManager.getSubscription());

export const isPushNotificationSupported = () =>
  typeof navigator !== 'undefined' &&
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  'PushManager' in window;
