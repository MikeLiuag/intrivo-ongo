import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Platform, NativeModules } from 'react-native';
import * as Localization from 'expo-localization';
import { currentBuild, currentVersion } from './constants';
import { getFromLocalStorage } from './localStorage';

// export const BASE_URL = 'https://devnew.intrivo.com';
// export const BASE_URL = 'https://mobileapi.intrivo.com';
// export const BASE_URL = 'https://dev.intrivo.com';
// export const BASE_URL = "https://qa.intrivo.com";
// export const BASE_URL = 'https://tenant1.k8s.infinidigm.com';
// export const BASE_URL = 'https://api.intrivo.com';

const ENVIRONMENTS = {
  dev: {
    baseUrl: 'https://dev.intrivo.com',
    qrCodeUrl: 'https://passport-dev.intrivo.com',
    universalLinkPrefix: 'https://ongo-dev.intrivo.com',
    deeplinkScheme: 'ongo-dev',
    zoomUrl: 'https://zoom-dev.intrivo.com',
  },
  qa: {
    baseUrl: 'https://qa.intrivo.com',
    qrCodeUrl: 'https://passport-qa.intrivo.com',
    universalLinkPrefix: 'https://ongo-qa.intrivo.com/',
    deeplinkScheme: 'ongo-qa',
    zoomUrl: 'https://zoom-qa.intrivo.com',
  },
  stage: {
    baseUrl: 'https://api-canary.intrivo.com',
    qrCodeUrl: 'https://passport.intrivo.com',
    universalLinkPrefix: 'https://ongo-canary.intrivo.com/',
    deeplinkScheme: 'ongo-stage',
    zoomUrl: 'https://zoom.intrivo.com',
  },
  prod: {
    baseUrl: 'https://api.intrivo.com',
    qrCodeUrl: 'https://passport.intrivo.com',
    universalLinkPrefix: 'https://ongo.intrivo.com/',
    deeplinkScheme: 'ongo',
    zoomUrl: 'https://zoom.intrivo.com',
  },
};

const APP_ENV = process.env.APP_ENV || 'dev';
export const BASE_URL = ENVIRONMENTS[APP_ENV].baseUrl;
export const IS_DEV = APP_ENV === 'dev' || APP_ENV === 'qa';
export const QR_CODE_URL = ENVIRONMENTS[APP_ENV].qrCodeUrl;
export const UNIVERSALLINK_PREFIX = ENVIRONMENTS[APP_ENV].universalLinkPrefix;
export const DEEPLINK_SCHEME = ENVIRONMENTS[APP_ENV].deeplinkScheme;
export const ZOOM_URL = ENVIRONMENTS[APP_ENV].zoomUrl;

const APP_VERSION = `ongo-${Platform.OS}/${currentVersion}-${currentBuild}`;
const USER_TIMEZONE =
  Localization.timezone && Localization.timezone.includes('/') ? Localization.timezone : '';

const axiosInstanceNoBase = axios.create({
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-app-version': APP_VERSION,
    },
  },
  timeout: 10000,
});

// retry
axiosRetry(axiosInstanceNoBase, {
  retries: 1,
  retryDelay: (retryCount) => retryCount * 1000,
  // retryCondition: (error) => error.response.status !== 401,
});

const AcceptLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v2`,
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-app-version': APP_VERSION,
      'X-Timezone': USER_TIMEZONE,
      'Accept-Language': AcceptLanguage,
    },
  },
  timeout: 10000,
});

// retry
axiosRetry(axiosInstance, {
  retries: 1,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => error?.response?.status !== 401,
});

const axiosInstanceFormData = axios.create({
  baseURL: `${BASE_URL}/api/v2`,
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'x-app-version': APP_VERSION,
    },
  },
  timeout: 300000,
});

// retry
axiosRetry(axiosInstanceFormData, {
  retries: 1,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => error?.response?.status !== 401,
});

const NoInternetError = () => ({
  appMessage: 'No internet detected.',
  appSubtitle: 'Please check your connection',
});

axiosInstance.interceptors.request.use(async (config) => {
  const newConfig = { ...config };
  const accessToken = await getFromLocalStorage('token', true);
  // console.log(accessToken, '____accessToken');
  if (accessToken) {
    if (newConfig.baseURL && accessToken) {
      newConfig.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }
  return newConfig;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error?.message || '').includes('timeout') || (error?.message || '').includes('Network Error')
        ? new NoInternetError()
        : error
    )
);

axiosInstanceNoBase.interceptors.request.use(async (config) => {
  const newConfig = { ...config };
  const accessToken = await getFromLocalStorage('token', true);
  if (accessToken) {
    newConfig.headers.common.Authorization = `Bearer ${accessToken}`;
  }
  return newConfig;
});

axiosInstanceFormData.interceptors.request.use(async (config) => {
  const newConfig = { ...config };
  const accessToken = await getFromLocalStorage('token', true);
  if (accessToken) {
    newConfig.headers.common.Authorization = `Bearer ${accessToken}`;
  }
  return newConfig;
});

export default axiosInstance;
export { axiosInstanceNoBase, axiosInstanceFormData };

// export { axiosInstanceNoBase, axiosInstanceRaw };
