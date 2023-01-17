import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors } from '../../theme';

const SwitchContainer = ({ switchEnable, toggleSwitch }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('screens.longCovid.result.likelihood.switchText')}</Text>
      <View style={styles.switchContainer}>
        <Switch
          ios_backgroundColor={colors.greyGrey}
          onValueChange={() => toggleSwitch(!switchEnable)}
          value={switchEnable}
        />
      </View>
    </View>
  );
};

export default SwitchContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primaryGhost,
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 14,
  },
  text: {
    flex: 2,
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 21,
  },
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
