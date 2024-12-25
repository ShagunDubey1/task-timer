import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../utils/registerForPushNotificationsAsync';

export function usePushNotifications(
  setExpoPushToken: (token: string | undefined) => void,
  getExpoPushToken: () => Promise<string | undefined>
) {
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Fetch stored Expo Push Token
    getExpoPushToken().then((storedToken) => {
      if (!storedToken) {
        // If no token is stored, register for push notifications
        registerForPushNotificationsAsync()
          .then((token) => {
            if (isMounted && token) {
              setExpoPushToken(token);
            }
          })
          .catch((error) => {
            console.error(
              'Error while registering for push notifications:',
              error
            );
            setExpoPushToken(undefined);
          });
      }
    });

    // Subscribe to notification events
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        if (isMounted) {
          setNotification(notification);
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (isMounted) {
          redirect(response.notification);
        }
      });

    // Handle notification response on app launch
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (isMounted && response?.notification) {
        redirect(response.notification);
      }
    });

    // Cleanup subscriptions
    return () => {
      isMounted = false;
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [getExpoPushToken, setExpoPushToken]);

  function redirect(notification: Notifications.Notification) {
    const url = notification.request.content.data?.url as string | undefined;
    if (url) {
      console.log('Redirecting to URL:', url);
    }
  }

  return { notification };
}
