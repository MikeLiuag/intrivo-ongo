import React, { useCallback, useEffect } from 'react';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBadgeCountAsync, setBadgeCountAsync } from 'expo-notifications';
import {
  setPushNotification,
  setInAppModal,
  setAppModalData,
  setAppBannerModalData,
} from '../store/app/slice';
import requestUserPermission from '../notification/pushNotificationPermission';
import { DEEPLINK_SCHEME } from '../utilis/axios';

const ALERT_TYPES = {
  MODAL: 'MODAL',
  BANNER: 'BANNER',
  NONE: 'NONE',
};

const CTA_TYPES = {
  style: {
    SECONDARY: 'SECONDARY',
    PRIMARY: 'PRIMARY',
    DANGER: 'DANGER',
  },
  action: {
    WEBVIEW: 'WEBVIEW',
    LINK: 'LINK',
    DEEPLINK: 'DEEPLINK',
  },
};

const PushNotification = ({ replaceDeepLink }) => {
  const topic = useSelector((state) => state.app.topic);
  const isAuthed = useSelector((state) => state.app?.isAuthed) ?? null;
  const dispatch = useDispatch();

  const incrementBadgeCountOnMessage = useCallback(
    () =>
      getBadgeCountAsync().then((badgeCount) => {
        setBadgeCountAsync(badgeCount + 1);
      }),
    []
  );

  const decrementBadgeCountOnPressedNotification = useCallback(
    () =>
      getBadgeCountAsync().then((badgeCount) => {
        if (badgeCount > 0) {
          setBadgeCountAsync(badgeCount - 1);
        }
      }),
    []
  );

  const linkHandler = useCallback(
    (action, link, isOld = false) => {
      let callback = {};
      switch (action.toUpperCase()) {
        case CTA_TYPES.action.WEBVIEW:
          callback = () => {
            Linking.openURL(`${DEEPLINK_SCHEME}://webview/${link}`);
          };
          break;
        case CTA_TYPES.action.DEEPLINK:
          callback = () => {
            if (isOld) {
              Linking.openURL(`${DEEPLINK_SCHEME}:///member/${link}`);
            } else {
              Linking.openURL(link);
            }
          };
          break;
        case CTA_TYPES.action.LINK:
        default:
          callback = () => {
            Linking.openURL(`${DEEPLINK_SCHEME}://link/${link}`);
          };
          break;
      }
      decrementBadgeCountOnPressedNotification();
      return callback;
    },
    [decrementBadgeCountOnPressedNotification]
  );

  const getCallback = useCallback(
    (cta) => {
      if (cta?.length > 0) {
        return cta.map((item) => {
          const { action, text = 'Go', style, link } = item;
          const callback = linkHandler(action, link);
          return { style, text, callback };
        });
      }
      return [];
    },
    [linkHandler]
  );

  const storeNotif = async (notif) => {
    await AsyncStorage.setItem('notification', JSON.stringify(notif));
  };

  const setAuthedNotif = useCallback(
    ({ parsePayload, isForeground, body, title }) => {
      const {
        alert_style: alertStyle = '',
        cta = [],
        body: modalBody = '',
        title: modalTitle = '',
      } = parsePayload.payload;

      const callbacks = getCallback(cta, isForeground) || [];
      const parseMessage = {
        title,
        body,
        cta: callbacks,
        auto: false,
        waitForLogin: !isAuthed,
      };

      dispatch(setPushNotification(parseMessage));
      switch (alertStyle.toUpperCase()) {
        case ALERT_TYPES.MODAL:
          dispatch(setAppModalData({ title: modalTitle, body: modalBody, cta: callbacks }));
          dispatch(setInAppModal(true));
          break;
        case ALERT_TYPES.BANNER:
          dispatch(
            setAppBannerModalData({
              title: modalTitle,
              body: modalBody,
              cta: callbacks[0],
            })
          );
          break;
        case ALERT_TYPES.NONE:
          dispatch(setAppModalData({}));
          dispatch(setInAppModal(false));
          if (callbacks.length === 1) {
            const { callback = null } = callbacks[0];
            callback();
          }
          break;
        default:
      }
    },
    [dispatch, getCallback, isAuthed]
  );

  useEffect(() => {
    const getNotif = async () => {
      const notification = await AsyncStorage.getItem('notification');
      if (isAuthed && notification) {
        const notif = JSON.parse(notification);
        setAuthedNotif(notif);
        AsyncStorage.removeItem('notification');
      }
    };
    getNotif();
  }, [isAuthed, setAuthedNotif]);

  // notification action handler
  const notificationHandler = useCallback(
    (message, isForeground) => {
      const { notification: { body = '', title = '' } = {}, data: { payload } = {} } = message;
      replaceDeepLink(null);
      try {
        const parsePayload = JSON.parse(payload) || {};

        if (isAuthed) {
          setAuthedNotif({ parsePayload, isForeground, body, title });
        } else {
          storeNotif({ parsePayload, isForeground, body, title });
        }
      } catch {
        const firstSlashIndex = payload.indexOf('/');
        const action = payload.slice(0, firstSlashIndex);
        const link = payload.slice(firstSlashIndex + 1);

        const callback = linkHandler(action, link, true);
        if (isAuthed) {
          callback();
        } else {
          dispatch(
            setPushNotification({
              callback,
              waitForLogin: true,
            })
          );
        }
      }
    },
    [replaceDeepLink, isAuthed, setAuthedNotif, linkHandler, dispatch]
  );

  // push notification foreground
  useEffect(() => {
    let unsubscribe;
    requestUserPermission().then(() => {
      if (topic) {
        messaging().subscribeToTopic(topic);
        // console.log(`subscribe to topic: ${topic}`)
        // messaging().getToken().then((token) => console.log(token))
      }
      unsubscribe = messaging().onMessage(async (remoteMessage) => {
        if (remoteMessage) {
          incrementBadgeCountOnMessage();
          notificationHandler(remoteMessage, true);
        }
      });
    });
    return () => {
      if (topic) {
        messaging().unsubscribeFromTopic(topic);
      }
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [topic]);

  // background push notification
  useEffect(() => {
    messaging().setBackgroundMessageHandler((message) => {
      if (message) {
        notificationHandler(message, false);
      }
    });
    const unsubscribeNotification = messaging().onNotificationOpenedApp((message) => {
      if (message) {
        notificationHandler(message, false);
      }
    });
    return unsubscribeNotification;
    // background notification effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sets badge count to unreadNotificationsCount once user closes/backgrounds the app
  // TBD: from where unreadNotificationsCount is coming from
  // useEffect(() => setBadgeCountAsync(unreadNotificationsCount), []);

  // quit app notification
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteNotification) => {
        if (remoteNotification) {
          notificationHandler(remoteNotification, false);
        }
      });
    // quit app effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // for testing push notification and init notification
  // useEffect(() => {
  //   // AsyncStorage.getItem('notification', (notif) => {
  //   //   if (notif !== null) {
  //   //     dispatch(setPushNotification(JSON.parse(notif)));
  //   //   }
  //   //   AsyncStorage.removeItem('notification');
  //   // });
  //   // messaging()
  //   //   .getToken()
  //   //   .then((token) => {
  //   //     console.log(token);
  //   //     Alert.alert('Use this token for testing', token);
  //   //   });
  // }, []);
  return <></>;
};

export default PushNotification;
