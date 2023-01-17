import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { fonts } from '../../theme/fonts';
import { colors } from '../../theme';
import { LogEvent } from '../../analytics';
import LandingIntro from '../../components/LandingIntro';

const translationPath = 'screens.sniffles.assessmentInfoVB';
const IntroImage = require('../../assets/SnifflesAssesmentB.png');

const AssessmentInfoVB = ({ navigation }) => {
  const { t } = useTranslation();
  const windowHeight = useWindowDimensions().height;
  const { snifflesAssessmentOptionB: optionB } = useSelector(({ app }) => app.firebase);

  const onClosePress = () => {
    LogEvent('Sniffles_QuizB_Intro_click_Close');
    navigation.navigate('Home');
  };

  const onStartPress = () => {
    LogEvent('Sniffles_QuizB_Intro_click_Start');
    if (optionB) {
      navigation.navigate('SnifflesAssessmentQuestionnaire', {
        skipToStep: 4,
        optionB: true,
        flow: 'B',
      });
    } else {
      navigation.navigate('IntroToSolutionsV2', { flow: 'B' });
    }
  };

  useEffect(() => {
    LogEvent('Sniffles_QuizB_Intro_screen');
  }, []);

  return (
    <LandingIntro
      title={' '}
      subtitle={t(`${translationPath}.title`)}
      introBullets={[t(`${translationPath}.description`)]}
      description={' '}
      headerImage={IntroImage}
      rightButton={{ title: t(`${translationPath}.button`), onAction: onStartPress }}
      handleBack={onClosePress}
      border={false}
      headerBackground={false}
      withoutBulletNumberation
      descriptionTextStyle={styles.bulletTextStyle}
      bulletTextStyle={styles.bulletTextStyle}
      inLineDisclaimer={t(`${translationPath}.disclaimer.description`)}
      contentStyle={{ height: windowHeight * 0.87 }}
    />
  );
};

export default AssessmentInfoVB;

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
