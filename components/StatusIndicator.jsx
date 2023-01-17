import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';

const StatusIndicator = ({ color, title }) => {
  const { t } = useTranslation();
  const backgroundColor = color || colors.secondaryButtonBorder;
  const textColor = color ? colors.white : colors.greyDark;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{t(title)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  title: {
    fontFamily: fonts.familyBold,
  },
});

export default StatusIndicator;
