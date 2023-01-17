import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { colors } from '../../../../theme';
import { fonts } from '../../../../theme/fonts';

const PreparationImage = require('../../../../assets/telehealth-prepare.png');

const IntroToQuestions = () => {
  const { t } = useTranslation();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='handled'
      scrollEventThrottle={5}
    >
      <View>
        <Image
          source={PreparationImage}
          style={{ width: '100%', height: 300, marginTop: 60 }}
          resizeMode='contain'
        />
        <Text style={styles.title}>
          {t('screens.sniffles.snifflesTelehealth.questions.introToQuestions.title')}
        </Text>
        <Text style={styles.text}>
          {t('screens.sniffles.snifflesTelehealth.questions.introToQuestions.description')}
        </Text>
      </View>
    </ScrollView>
  );
};

export default IntroToQuestions;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    lineHeight: 36,
    marginTop: 60,
    marginBottom: 24,
    textAlign: 'center',
  },
  text: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeLarge,
    color: colors.greyDark,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 24,
  },
});
