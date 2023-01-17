import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

// we want to disable notification alerts if the app is already open
// This is appropriate since we are only using this to alert the user
//  that the test timer is almost up.
Notifications.setNotificationHandler({
  handleNotification: async (notificationObject) => {
    const showInApp = notificationObject?.request?.content?.data?.showInApp ?? true;
    return {
      shouldShowAlert: showInApp,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

export default () => {
  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((response) => {
      console.log(response, 'addNotificationReceivedListener');
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response, 'addNotificationResponseReceivedListener');
    });

    if (lastNotificationResponse) {
      console.log(lastNotificationResponse, 'lastNotificationResponse');
    }

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [lastNotificationResponse]);
  return null;
};
