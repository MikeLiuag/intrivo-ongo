import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Platform, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import LandingIntro from '../../../components/LandingIntro';
import { LogEvent } from '../../../analytics';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import { isCurrentTimeBetween } from '../../../utilis/dateTime';
import TelehealthDisclaimer from '../../../components/TelehealthDisclaimer';
import CameraCheck from '../../CameraCheck';

const translationPrefix = 'screens.sniffles.snifflesTelehealth.intro';

const BULLETS = [`${translationPrefix}.bullet1`];
const IntroImage = require('../../../assets/telehelath-intro.png');

function SnifflesTelehealthIntro() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { goBack, navigate } = useNavigation();

  const [showAudioPermissionsModal, setShowAudioPermissionsModal] = useState(false);
  const [showCameraPermissionModal, setShowCameraPermissionModal] = useState(false);

  const hasAudioPermissions = useRef(false);
  const hasCameraPermissions = useRef(false);

  useEffect(() => {
    LogEvent('Sniffles_Virtual_Intro_screen');
    Promise.all([Camera.getCameraPermissionsAsync(), Camera.getMicrophonePermissionsAsync()]).then(
      (results) => {
        hasCameraPermissions.current = results[0].granted;
        hasAudioPermissions.current = results[1].granted;
      }
    );
  }, []);

  const goNext = () => navigate('SnifflesTelehealthQuestionnaire');

  const navigateToQuestionnaire = () => {
    LogEvent('Sniffles_Virtual_Intro_click_Start');
    if (hasCameraPermissions.current) {
      if (hasAudioPermissions.current) goNext();
      else setShowAudioPermissionsModal(true);
    } else setShowCameraPermissionModal(true);
  };

  const handleBack = () => {
    LogEvent('Sniffles_Virtual_Intro_click_Close');
    navigation.navigate('Home');
  };

  const handleLeftButton = () => {
    LogEvent('Sniffles_Virtual_Intro_click_Back');
    goBack();
  };

  const handlePolicyLink = () => {
    LogEvent('Sniffles_Virtual_Intro_click_Privacy');
    navigation.push('PrivacyPolicy', {
      policy: [
        t('screens.telehealth.info.privacyPolicy1'),
        t('screens.telehealth.info.privacyPolicy2'),
      ],
    });
  };

  const handleModalClose = () => {
    Promise.all([
      Camera.requestCameraPermissionsAsync(),
      Camera.requestMicrophonePermissionsAsync(),
    ]).then((results) => {
      setShowAudioPermissionsModal(false);
      const granted = results.reduce((acc, curr) => acc && curr.granted, true);
      if (granted) goNext();
      else Linking.openSettings();
    });
  };

  const handleCameraModalClose = async () => {
    const { granted } = await Camera.getCameraPermissionsAsync();
    if (granted) {
      hasCameraPermissions.current = true;
      setShowCameraPermissionModal(false);
      navigateToQuestionnaire();
    }
  };

  if (showCameraPermissionModal) return <CameraCheck onCameraPermission={handleCameraModalClose} />;

  return (
    <View style={styles.container}>
      <LandingIntro
        title=' '
        handleBack={handleBack}
        handleHeaderLeft={handleLeftButton}
        headerImage={IntroImage}
        introBullets={BULLETS}
        withoutBulletNumberation
        bulletTextStyle={styles.bulletTextStyle}
        subtitle={t(`${translationPrefix}.subtitle`)}
        description={t(`${translationPrefix}.description`)}
        tooltipText={t(`${translationPrefix}.toolTipText`)}
        descriptionTextStyle={styles.bulletTextStyle}
        visitTime={t(`${translationPrefix}.visitTime`)}
        rightButton={{
          title: t(`${translationPrefix}.button`),
          onAction: navigateToQuestionnaire,
          disabled: !isCurrentTimeBetween('08:00', '20:00'),
        }}
        border={false}
        headerBackground={false}
        showPrivacyPolicy
        handlePolicyLink={handlePolicyLink}
        privacyPolicyAnalytic='Sniffles_Virtual_Intro_click_Privacy'
        isBeta
        showDisclaimer
      />
      <TelehealthDisclaimer visible={showAudioPermissionsModal} onModalClose={handleModalClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  link: {
    fontFamily: fonts.familyBold,
    color: colors.primaryBlue,
  },
  header: {
    paddingHorizontal: 14,
    marginTop: Platform.select({ ios: 30, default: 15 }),
  },
  bulletTextStyle: {
    lineHeight: 25,
    textAlign: 'center',
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    color: colors.greyGrey,
  },
});

export default SnifflesTelehealthIntro;
