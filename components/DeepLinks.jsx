import { useEffect } from 'react';
import { Linking } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { setDeepLink } from '../store/app/slice';
import { UNIVERSALLINK_PREFIX, DEEPLINK_SCHEME } from '../utilis/axios';

const DeepLinks = ({ deepLink, navRef, navReady, replaceDeepLink, botNavScreens }) => {
  const screenFromBotTab = Object.keys(botNavScreens);
  const isAuthed = useSelector((state) => state.app?.isAuthed) ?? null;
  const savedEmail = useSelector((state) => state.app.savedEmail);
  const dispatch = useDispatch();

  function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

  function parseUrl(url) {
    const scheme = url.split('://')[0];
    const host = url.split('://')[1].split('/')[0];
    const pathArr = url.split('://')[1].split('?')[0].split('/');
    pathArr.shift();
    const path = pathArr.join('/');
    const queryString = url.split('?')[1];
    const query = {};
    if (queryString) {
      // TODO
    }
    return { scheme, host, path, query, queryString: queryString || '' };
  }

  function formatParams(queryString) {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let match;
    // fast way to get params from deep link url on react native(URL class issue solving)
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(`?${queryString}`))) {
      // eslint-disable-next-line prefer-destructuring
      params[match[1]] = match[2];
    }

    Object.entries(params).forEach(([key, keyValue]) => {
      const parsedKey = key
        .split('_')
        .map((word, index) => (index !== 0 ? word[0].toUpperCase() + word.substring(1) : word))
        .join('');
      params[parsedKey] = keyValue;
      delete params[key];
    });
    return params;
  }

  useEffect(() => {
    const authedFlow = (to, toParams) => {
      if (screenFromBotTab.find((name) => name === to)) {
        navRef?.current?.navigate('Dashboard', { screen: to, ...toParams });
        return;
      }
      navRef?.current?.navigate(to, toParams);
    };

    const unAuthedFlow = () => {
      if (!savedEmail) {
        navRef.current?.navigate('SignUpSteps');
      }
    };

    const nestedNavs = ({ to, toParams }) => {
      if (screenFromBotTab.find((name) => name === to)) {
        return { to: 'Dashboard', toParams: { screen: to, ...toParams } };
      }
      return { to, toParams };
    };

    const nav = async (to, toParams, isDeepLink) => {
      if (isDeepLink) {
        await dispatch(setDeepLink(nestedNavs({ to, toParams })));
      }
      if (navReady && navRef?.current && navRef?.current.getRootState() && !isDeepLink) {
        await dispatch(setDeepLink(nestedNavs({ to: null, toParams })));

        if (!isAuthed) {
          unAuthedFlow();
          return;
        }
        authedFlow(to, toParams);
      }
      if (!screenFromBotTab.find((name) => name === to)) replaceDeepLink(null);
    };

    const formatScreenName = (linkName) => {
      const screenName = (linkName || '')
        .split('-')
        .map((word) => word[0]?.toUpperCase() + word?.substring(1))
        .join('');
      return screenName;
    };

    if (deepLink && deepLink !== null) {
      const urlObj = parseUrl(deepLink);
      const type = `${urlObj.scheme}://${urlObj.host}`;
      const value = `${urlObj.path}?${urlObj.queryString}`;

      console.log(urlObj);
      let deepLinkScreen = urlObj.path.split('/').find((p) => p && p !== 'member');

      const endOfLink = type === `${DEEPLINK_SCHEME}:///member/` ? 3 : 4;

      const memberValue = formatScreenName(
        !deepLink.includes('?')
          ? deepLink.substring(getPosition(deepLink, '/', endOfLink) + 1)
          : deepLink.substring(
              getPosition(deepLink, '/', endOfLink) + 1,
              getPosition(deepLink, '?', 1)
            )
      );

      deepLinkScreen = formatScreenName(deepLinkScreen);

      const params = formatParams(urlObj.queryString);

      console.log(deepLink, 'deepLink', type, 'param', params);

      switch (type) {
        case `${DEEPLINK_SCHEME}://link/`: {
          Linking.openURL(value);
          break;
        }
        case `${DEEPLINK_SCHEME}://webview`: {
          nav('WebViewHandler', { url: value });
          break;
        }
        case `${UNIVERSALLINK_PREFIX}/member`:
        case `${DEEPLINK_SCHEME}://`: {
          nav(memberValue, params, true);
          break;
        }
        default: {
          replaceDeepLink(null);
          nav(deepLinkScreen, params, true);
          break;
        }
      }
    }
  }, [
    deepLink,
    dispatch,
    isAuthed,
    navRef,
    navReady,
    savedEmail,
    replaceDeepLink,
    screenFromBotTab,
  ]);

  return null;
};

export default DeepLinks;
