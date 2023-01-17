import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Recaptcha from 'react-native-recaptcha-that-works';
import { StyleSheet } from 'react-native';
import { DOMAIN, SITE_KEY } from './constants';

const createRecaptchaHelper = (recaptchaRef, promiseTokenRef) => {
  let recaptchaLoading = false;
  return {
    getToken: () => {
      recaptchaRef.current.open();
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (recaptchaLoading) {
            reject(new Error('Loading timeout'));
          }
        }, 1000);
        promiseTokenRef.current = { resolve, reject };
      });
    },
    onLoad: () => {
      recaptchaLoading = true;
    },
    onVerify: (token) => {
      recaptchaLoading = false;
      promiseTokenRef?.current?.resolve(token);
    },
    onError: (err) => {
      recaptchaLoading = false;
      promiseTokenRef?.current?.reject(err);
    },
    onExpire: () => {
      recaptchaLoading = false;
      promiseTokenRef?.current?.reject('Expired');
    },
  };
};

const RecaptchaWrapper = forwardRef((_options, wrapperRef) => {
  const $recaptcha = useRef();
  const $promiseToken = useRef();
  const recaptchaHelper = createRecaptchaHelper($recaptcha, $promiseToken);

  useImperativeHandle(
    wrapperRef,
    () => ({
      getToken: recaptchaHelper.getToken,
    }),
    [recaptchaHelper]
  );

  return (
    <Recaptcha
      ref={$recaptcha}
      baseUrl={DOMAIN}
      siteKey={SITE_KEY}
      lang='en'
      style={styles.recaptcha}
      webViewProps={{
        style: styles.webView,
      }}
      onLoad={recaptchaHelper.onLoad}
      onVerify={recaptchaHelper.onVerify}
      onError={recaptchaHelper.onError}
      onExpire={recaptchaHelper.onExpire}
      theme='light'
      size='invisible'
      hideBadge
    />
  );
});

export default RecaptchaWrapper;

const styles = StyleSheet.create({
  recaptcha: {
    width: 0,
    height: 0,
    backgroundColor: 'transpargba(0, 0, 0, 0.0)',
  },
  webView: {
    backgroundColor: 'transpargba(0, 0, 0, 0.0)',
  },
});
