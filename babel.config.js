module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'transform-inline-environment-variables',
      {
        include: ['APP_ENV', 'SENTRY_AUTH_TOKEN'],
      },
    ],
  ],
};
