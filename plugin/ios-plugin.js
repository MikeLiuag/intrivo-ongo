import { withExpoPlist } from '@expo/config-plugins';

async function setExpoUpdatesConfigAsync(config, expoPlist) {
  expoPlist.EXUpdatesCheckOnLaunch = config.updates.checkAutomatically === 'ON_LOAD' ? 'ALWAYS' : 'NEVER'
  expoPlist.EXUpdatesReleaseChannel = config.version
  return expoPlist;
}

function modifyExpoPlist(config) {
  withExpoPlist(config, async (aconfig) => {
    aconfig.modResults = await setExpoUpdatesConfigAsync(aconfig, aconfig.modResults);
    return aconfig;
  });
}

export default (config) => {
  modifyExpoPlist(config);
  return config;
};
