import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme';
import Icon from '../assets/svgs/info_orange.svg';
import { fonts } from '../theme/fonts';

const AlertNote = ({ text, style, textStyle }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, style]}>
      <Icon />
      <Text style={styles.text}>
        {t('placeholder.note')}{' '}
        <Text style={[{ fontFamily: fonts.familyNormal, fontWeight: 'normal' }, textStyle]}>
          {text}
        </Text>
      </Text>
    </View>
  );
};

export default AlertNote;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primaryOrange,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 64,
  },
  text: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    color: colors.greyMidnight,
    marginLeft: 12,
    maxWidth: '80%',
  },
});
