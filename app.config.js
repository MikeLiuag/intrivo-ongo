// import { withPlugins } from '@expo/config-plugins';
// import { existsSync, mkdir, writeFile } from 'fs'
import devConfig from './app.dev.json';
import qaConfig from './app.qa.json';
import stageConfig from './app.stage.json';
import prodConfig from './app.prod.json';

module.exports = () => {
  const environment = process.env.APP_ENV || 'dev';
  const version = process.env.APP_VERSION || '1.0';
  let versionCode = process.env.APP_VERSION_CODE || '100';

  // Sentry env variables - better to keep in other file
  const {
    SENTRY_AUTH_TOKEN,
    SENTRY_PROJECT = 'ongo-mobile',
    SENTRY_ORGANIZATION = 'intrivo-diagnostics',
  } = process.env;

  let config = {};

  if (environment === 'prod') {
    config = prodConfig;
  } else if (environment === 'stage') {
    config = stageConfig;
  } else if (environment === 'qa') {
    config = qaConfig;
    versionCode = process.env.APP_VERSION_CODE || '100';
  } else if (environment === 'dev') {
    config = devConfig;
    versionCode = process.env.APP_VERSION_CODE || '100';
  } else {
    throw new Error('Cannot recognize app environment');
  }

  if (process.env.APP_VERSION_SUFFIX === 'true') {
    const date = new Date().toISOString().slice(0, 16);
    config.version = `${version}-${date}`;
  } else {
    config.version = version;
  }
  config = {
    ...config,
    android: { ...config.android, versionCode: parseInt(versionCode, 10) },
    ios: { ...config.ios, buildNumber: versionCode },
    plugins: [...config.plugins, 'sentry-expo'],
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: SENTRY_ORGANIZATION,
            project: SENTRY_PROJECT,
            authToken: SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  };
  // var androidPlugins = require('./plugin/android-plugin');
  // var iosPlugins = require('./plugin/ios-plugin');
  // config.updates = { ...config.updates, releaseChannel: [environment, version].join('-') }
  // if (!existsSync('tmp')) {
  //   mkdir('tmp', { recursive : true }, (err) => { console.error(`Failed create tmp dir: ${err}`) });
  // }
  // writeFile('tmp/app.json', JSON.stringify(config, null, 2), 'utf8', (err) => {
  //   if (err) {
  //       console.error('err');
  //   }
  // });
  return config;
};
