import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';

const IntroToQuestions = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.text}>
        {t('screens.telehealth.questions.introToQuestions.description')}
      </Text>
    </View>
  );
};

export default IntroToQuestions;

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeLarge,
    color: colors.greyDark,
    lineHeight: 28,
  },
});
