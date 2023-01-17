const {
  AndroidConfig,
  withAndroidManifest,
  withGradleProperties
} = require('@expo/config-plugins');

const {
  addMetaDataItemToMainApplication,
  getMainApplicationOrThrow,
} = AndroidConfig.Manifest;

async function setExpoUpdatesConfigAsync(config, androidManifest) {
  // Get the <application /> tag and assert if it doesn't exist.
  const mainApplication = getMainApplicationOrThrow(androidManifest)

  addMetaDataItemToMainApplication(
    mainApplication,
    // value for `android:name`
    'expo.modules.updates.EXPO_UPDATES_CHECK_ON_LAUNCH',
    // value for `android:value`
    config.updates.checkAutomatically === 'ON_LOAD' ? 'ALWAYS' : 'NEVER',
  )
  addMetaDataItemToMainApplication(
    mainApplication,
    // value for `android:name`
    'expo.modules.updates.EXPO_UPDATES_RELEASE_CHANNEL',
    // value for `android:value`
    config.version,
  )

  return androidManifest
}

function modifyExpoUpdatesManifest(config) {
  config = withAndroidManifest(config, async (config) => {
    config.modResults = await setExpoUpdatesConfigAsync(config, config.modResults);
    return config;
  });
}

function provideAndroidInfo(config) {
  const propertyToModify = {
    type: "property",
    key: "app.applicationId",
    value: config.android.applicationId,
  }
  config = withGradleProperties(config, async (config) => {
    config.modResults = config.modResults.filter(
      (item) => !(item.type === propertyToModify.type && item.key === propertyToModify.key)
    );
    config.modResults.push(propertyToModify);
    return config;
  });
}

module.exports = (config) => {
  modifyExpoUpdatesManifest(config);
  provideAndroidInfo(config);
  return config;
};
