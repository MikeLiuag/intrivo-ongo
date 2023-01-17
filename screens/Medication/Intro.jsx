import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import LandingIntro from '../../components/LandingIntro';
import { INTRO_BULLETS } from './constant';
import { LogEvent } from '../../analytics';
import { fonts } from '../../theme/fonts';
import { colors } from '../../theme';
import AlternativeCareOptions from '../../components/AlternativeCareOptions';
import BlueWarning from '../../components/Svg/BlueWarning';

const IntroImage = require('../../assets/medication-intro.png');

const translationPath = 'screens.medicationFlow.intro';
const analyticIntro = 'Sniffles_Async_Intro';
const analyticHow = 'Sniffles_Async_How';

function MedicationIntro({ navigation }) {
  const { t } = useTranslation();
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);

  useEffect(() => {
    LogEvent(`${analyticIntro}_click_screen`);
  }, []);

  const handleBack = () => {
    LogEvent(`${analyticIntro}_click_Close`);
    navigation.navigate('Home');
  };

  const handleLeftButton = () => {
    LogEvent(`${analyticIntro}_click_Back`);
    navigation.goBack();
  };

  const onCheck = () => {
    LogEvent(`${analyticIntro}_click_Start`);
    navigation.navigate('MedicationQuestionnaire');
  };

  const onPressBottomLink = () => {
    LogEvent(`${analyticIntro}_click_How`);
    setIsCompletedModalVisible(true);
  };

  const onModalClose = (type) => {
    LogEvent(`${analyticHow}_click_${type}`);
    setIsCompletedModalVisible(false);
  };

  return (
    <>
      <LandingIntro
        title={' '}
        subtitle={t('screens.medicationFlow.intro.title')}
        introBullets={INTRO_BULLETS}
        headerImage={IntroImage}
        description={t('screens.medicationFlow.intro.description')}
        tooltipText={t(`screens.medicationFlow.intro.toolTipText`)}
        bottomLink={[t('screens.medicationFlow.intro.bottomLink'), onPressBottomLink]}
        rightButton={{ title: t('screens.medicationFlow.intro.check'), onAction: onCheck }}
        handleBack={handleBack}
        handleHeaderLeft={handleLeftButton}
        border={false}
        headerBackground={false}
        withoutBulletNumberation
        descriptionTextStyle={styles.bulletTextStyle}
        bulletTextStyle={styles.bulletTextStyle}
        isBeta
        showDisclaimer
      />
      {isCompletedModalVisible && (
        <AlternativeCareOptions
          visible={isCompletedModalVisible}
          title={t(`${translationPath}.warning.title`)}
          descr={t(`${translationPath}.warning.description`)}
          buttonTitle={t(`${translationPath}.warning.button`)}
          SvgComponent={BlueWarning}
          background
          result={0}
          onBack={() => onModalClose('Back')}
          onPressButton={() => onModalClose('GotIt')}
          analyticName={analyticHow}
        />
      )}
    </>
  );
}

export default MedicationIntro;

const styles = StyleSheet.create({
  bulletTextStyle: {
    lineHeight: 25,
    textAlign: 'center',
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyGrey,
  },
  description: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyLight,
    color: colors.greyGrey,
    lineHeight: 28,
    marginRight: 5,
  },
});
