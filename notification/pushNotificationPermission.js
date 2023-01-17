// eslint-disable-next-line import/no-unresolved
import messaging from '@react-native-firebase/messaging';

export default async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({ badge: true });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
}
