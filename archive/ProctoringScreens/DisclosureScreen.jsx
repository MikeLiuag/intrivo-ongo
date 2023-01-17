import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme';

import { BlueButton } from '../../components/Buttons/BlueButton';

const logoImg = require('../../assets/icon.png');

const DisclosureScreen = ({ onContinue = () => null, onBack = () => null }) => {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logoImg} />
      </View>
      <View>
        <Text style={styles.title}>{t('disclosureScreen.title')}</Text>
        <Text style={styles.description}>
          {t('disclosureScreen.description')}
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <BlueButton
            style={styles.secondaryButton}
            styleText={styles.secondaryButtonText}
            title={t('disclosureScreen.buttonNoThanks')}
            action={onBack}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 8 }}>
          <BlueButton
            title={t('disclosureScreen.buttonContinue')}
            action={onContinue}
          />
        </View>
      </View>
    </View>
  );
};

export default DisclosureScreen;

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 32,
    marginLeft: -10,
  },
  logo: {
    height: 60,
    width: 60,
  },
  title: {
    marginTop: 24,
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 25,
  },
  description: {
    marginTop: 24,
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 25,
    color: colors.greyMed,
  },
  buttonContainer: {
    marginBottom: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: { backgroundColor: 'white', borderColor: colors.greyLight },
  secondaryButtonText: {
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    fontSize: 16,
  },
});
