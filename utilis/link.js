import { Linking } from 'react-native';

const openMap = async ({ address1, address2, city, state, country }) => {
  const address = [address1, address2, city, state, country]
    .filter((e) => e)
    .join('+')
    .replace(/\s/gi, '+');
  const link = `https://www.google.com/maps/dir/?api=1&destination=${address}`;

  try {
    const supported = await Linking.canOpenURL(link);

    if (supported) Linking.openURL(link);
  } catch (error) {
    console.error(error);
  }
};

const openLink = (navigation, interstital = true, params = {}) => {
  const { useWebView, url, viewshot, title } = params;
  if (interstital) {
    return navigation.navigate('Interstitial', {
      ...params,
    });
  }
  if (useWebView) {
    return navigation.navigate('WebViewHandler', {
      url,
      title,
      viewshot: !!viewshot,
    });
  }
  return Linking.openURL(url);
};

export default { openMap };
export { openMap, openLink };
