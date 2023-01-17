const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          'Intrivo',
          'rn',
          'toggle',
          'react-native-calendars',
          'react-native-snap-carousel',
        ],
      },
    },
    argv
  );

  // config.entry = ['babel-polyfill', './index.js'];

  // Customize the config before returning it.
  // Resolve relative reference ../Utilities/Platform using react-native-web
  config.resolve.alias['react-native$'] = 'react-native-web';
  config.resolve.alias['../../Utilities/Platform'] =
    'react-native-web/dist/exports/Platform';
  config.resolve.alias['../Utilities/Platform'] =
    'react-native-web/dist/exports/Platform';
  config.resolve.alias['./Platform'] = 'react-native-web/dist/exports/Platform';
  config.resolve.alias['../../package.json'] =
    '@stripe/stripe-react-native/package.json';
  config.resolve.alias['./PlatformColorValueTypes'] =
    'react-native-web/dist/exports/StyleSheet';
  config.resolve.alias['./RCTAlertManager'] =
    'react-native-web/dist/exports/Alert';
  // // config.resolve.extensions = ['.web.js', '.js'];

  return config;
};
