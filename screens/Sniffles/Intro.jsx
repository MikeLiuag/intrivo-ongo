import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';
import { LogEvent } from '../../analytics';
import LandingIntro from '../../components/LandingIntro';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';

const IntroImage = require('../../assets/schedule-intro.png');

const translationPrefix = 'screens.sniffles.intro';

const BULLETS = [`${translationPrefix}.bullet1`];

function SnifflesIntro() {
  const { t } = useTranslation();
  const { goBack, navigate } = useNavigation();

  useEffect(() => {
    LogEvent('Sniffles_POC_Intro_screen');
  }, []);

  const navigateToQuestionnaire = () => {
    LogEvent('Sniffles_POC_Intro_clickGetstarted');
    navigate('SnifflesQuestionnaire');
  };

  const onBackPress = () => {
    LogEvent('Sniffles_POC_Intro_click_Back');
    goBack();
  };

  const onClosePress = () => {
    LogEvent('Sniffles_POC_Intro_click_Close');
    navigate('Home');
  };

  const onPressCheckAvailability = () => {
    navigate('CheckAvailability');
    LogEvent('Sniffles_POC_Intro_click_Checkavail');
  };

  return (
    <>
      <LandingIntro
        title=' '
        handleBack={onClosePress}
        handleHeaderLeft={onBackPress}
        headerImage={IntroImage}
        introBullets={BULLETS}
        withoutBulletNumberation
        bulletTextStyle={styles.bulletTextStyle}
        subtitle={t(`${translationPrefix}.title`)}
        tooltipText={t(`${translationPrefix}.tooltipText`)}
        description={t(`${translationPrefix}.description`)}
        visitTime={
          <Text>
            {t(`${translationPrefix}.description2`)}
            {'\n'}
            <Text onPress={onPressCheckAvailability} style={styles.link}>
              {t(`${translationPrefix}.descriptionLink`)}
            </Text>
          </Text>
        }
        descriptionTextStyle={styles.bulletTextStyle}
        rightButton={{
          title: t(`${translationPrefix}.button`),
          onAction: navigateToQuestionnaire,
        }}
        border={false}
        headerBackground={false}
        isBeta
        showDisclaimer
      />
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    fontFamily: fonts.familyNormal,
    color: colors.primaryBlue,
  },
  modal: {
    paddingVertical: 21,
  },
  header: {
    paddingHorizontal: 14,
  },
  modalContainer: {
    paddingVertical: 21,
    paddingHorizontal: 25,
  },
  markets: {
    paddingVertical: 21,
  },
  modalText: {
    fontFamily: fonts.familyLight,
    color: colors.greyMed,
  },
  bulletTextStyle: {
    lineHeight: 25,
    textAlign: 'center',
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyGrey,
  },
});

export default SnifflesIntro;
