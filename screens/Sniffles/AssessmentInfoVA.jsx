import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { fonts } from '../../theme/fonts';
import { colors } from '../../theme';
import { LogEvent } from '../../analytics';
import LandingIntro from '../../components/LandingIntro';

const translationPath = 'screens.sniffles.assessmentInfoVA';
const IntroImage = require('../../assets/SnifflesAssesmentBackgroundvA.png');

const AssessmentInfoVA = ({ navigation, route }) => {
  const { t } = useTranslation();
  const windowHeight = useWindowDimensions().height;

  const { skipLastQuestion } = route.params;

  const { snifflesAssessmentOptionB: optionB } = useSelector(({ app }) => app.firebase);

  const onClosePress = () => {
    LogEvent('Sniffles_QuizA_Intro_click_Close');
    navigation.navigate('Home');
  };

  const onStartPress = () => {
    LogEvent('Sniffles_QuizA_Intro_click_Start');
    navigation.navigate('SnifflesAssessmentQuestionnaire', { skipLastQuestion, optionB });
  };

  useEffect(() => {
    LogEvent('Sniffles_QuizA_Intro_screen');
  }, []);

  const onSkipPress = () => {
    LogEvent('Sniffles_QuizA_Intro_click_Skip');

    if (optionB) {
      navigation.navigate('SnifflesAssessmentQuestionnaire', {
        skipToStep: 4,
        optionB: true,
        didSkip: true,
      });
    } else {
      navigation.navigate('IntroToSolutionsV2', { flow: 'A' });
    }
  };

  return (
    <LandingIntro
      title={' '}
      subtitle={t(`${translationPath}.title`)}
      introBullets={[t(`${translationPath}.description`)]}
      headerImage={IntroImage}
      description={t(`${translationPath}.description2`)}
      rightButton={{ title: t(`${translationPath}.button`), onAction: onStartPress }}
      handleBack={onClosePress}
      border={false}
      headerBackground={false}
      withoutBulletNumberation
      descriptionTextStyle={styles.bulletTextStyle}
      bulletTextStyle={styles.bulletTextStyle}
      skipLink={[t(`${translationPath}.link`), onSkipPress]}
      inLineDisclaimer={t(`${translationPath}.disclaimer.description`)}
      contentStyle={{ height: windowHeight * 0.85 }}
    />
  );
};

export default AssessmentInfoVA;

const styles = StyleSheet.create({
  bulletTextStyle: {
    lineHeight: 21,
    textAlign: 'center',
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyMed,
  },
  description: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyLight,
    color: colors.greyGrey,
    lineHeight: 21,
    marginRight: 5,
  },
});
